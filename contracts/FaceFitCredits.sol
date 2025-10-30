// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FaceFitCredits
 * @dev Smart contract for managing Face-Fit upload credits with USDC payments
 * Users get 2 free uploads, then must pay USDC for additional credits
 */
contract FaceFitCredits is ReentrancyGuard, Ownable {
    // USDC contract address on Base testnet
    IERC20 public immutable usdcToken;
    
    // Price per upload credit in USDC (6 decimals)
    uint256 public creditPrice = 5000000; // $5.00 USDC
    
    // Free credits per user
    uint256 public constant FREE_CREDITS = 2;
    
    // Mapping to track user credits
    mapping(address => uint256) public userCredits;
    mapping(address => bool) public hasClaimedFree;
    
    // Events
    event CreditsPurchased(address indexed user, uint256 amount, uint256 totalCredits);
    event CreditsUsed(address indexed user, uint256 amount, uint256 remainingCredits);
    event FreeCreditsClaimd(address indexed user, uint256 amount);
    event PriceUpdated(uint256 newPrice);
    
    constructor(address _usdcToken) {
        usdcToken = IERC20(_usdcToken);
    }
    
    /**
     * @dev Claim free credits (once per user)
     */
    function claimFreeCredits() external {
        require(!hasClaimedFree[msg.sender], "Free credits already claimed");
        
        hasClaimedFree[msg.sender] = true;
        userCredits[msg.sender] += FREE_CREDITS;
        
        emit FreeCreditsClaimd(msg.sender, FREE_CREDITS);
    }
    
    /**
     * @dev Purchase additional upload credits with USDC
     * @param _amount Number of credits to purchase
     */
    function purchaseCredits(uint256 _amount) external nonReentrant {
        require(_amount > 0, "Amount must be greater than 0");
        
        uint256 totalCost = _amount * creditPrice;
        require(
            usdcToken.transferFrom(msg.sender, address(this), totalCost),
            "USDC transfer failed"
        );
        
        userCredits[msg.sender] += _amount;
        
        emit CreditsPurchased(msg.sender, _amount, userCredits[msg.sender]);
    }
    
    /**
     * @dev Use credits for upload (called by backend)
     * @param _user User address
     * @param _amount Number of credits to use
     */
    function useCredits(address _user, uint256 _amount) external onlyOwner {
        require(userCredits[_user] >= _amount, "Insufficient credits");
        
        userCredits[_user] -= _amount;
        
        emit CreditsUsed(_user, _amount, userCredits[_user]);
    }
    
    /**
     * @dev Get user's total credits (including free credits if not claimed)
     * @param _user User address
     * @return Total available credits
     */
    function getTotalCredits(address _user) external view returns (uint256) {
        uint256 credits = userCredits[_user];
        if (!hasClaimedFree[_user]) {
            credits += FREE_CREDITS;
        }
        return credits;
    }
    
    /**
     * @dev Update credit price (only owner)
     * @param _newPrice New price in USDC (6 decimals)
     */
    function updateCreditPrice(uint256 _newPrice) external onlyOwner {
        creditPrice = _newPrice;
        emit PriceUpdated(_newPrice);
    }
    
    /**
     * @dev Withdraw USDC revenue (only owner)
     * @param _amount Amount to withdraw
     */
    function withdrawUSDC(uint256 _amount) external onlyOwner {
        require(usdcToken.transfer(msg.sender, _amount), "Transfer failed");
    }
    
    /**
     * @dev Get contract USDC balance
     * @return USDC balance
     */
    function getUSDCBalance() external view returns (uint256) {
        return usdcToken.balanceOf(address(this));
    }
}