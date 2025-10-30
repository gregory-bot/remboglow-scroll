// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title FaceFitNFT
 * @dev NFT contract for storing user's skincare routines (optional feature)
 * Metadata is stored privately and only accessible by the owner
 */
contract FaceFitNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // Mapping from token ID to private metadata hash
    mapping(uint256 => string) private _privateMetadata;
    
    // Events
    event SkincareNFTMinted(address indexed to, uint256 tokenId, string metadataHash);
    
    constructor() ERC721("Face-Fit Skincare Plan", "FFSP") {}
    
    /**
     * @dev Mint a new skincare plan NFT
     * @param _to Recipient address
     * @param _tokenURI Public metadata URI (basic info)
     * @param _privateMetadataHash Hash of private skincare data
     * @return tokenId The minted token ID
     */
    function mintSkincareNFT(
        address _to,
        string memory _tokenURI,
        string memory _privateMetadataHash
    ) external onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        
        _mint(_to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        _privateMetadata[tokenId] = _privateMetadataHash;
        
        emit SkincareNFTMinted(_to, tokenId, _privateMetadataHash);
        
        return tokenId;
    }
    
    /**
     * @dev Get private metadata hash (only token owner or contract owner)
     * @param _tokenId Token ID
     * @return Private metadata hash
     */
    function getPrivateMetadata(uint256 _tokenId) external view returns (string memory) {
        require(
            ownerOf(_tokenId) == msg.sender || owner() == msg.sender,
            "Not authorized to view private metadata"
        );
        return _privateMetadata[_tokenId];
    }
    
    /**
     * @dev Get all NFTs owned by a user
     * @param _owner Owner address
     * @return Array of token IDs
     */
    function getTokensByOwner(address _owner) external view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(_owner);
        uint256[] memory tokens = new uint256[](tokenCount);
        uint256 index = 0;
        
        for (uint256 i = 1; i <= _tokenIds.current(); i++) {
            if (ownerOf(i) == _owner) {
                tokens[index] = i;
                index++;
            }
        }
        
        return tokens;
    }
    
    // Override required functions
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
        delete _privateMetadata[tokenId];
    }
    
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}