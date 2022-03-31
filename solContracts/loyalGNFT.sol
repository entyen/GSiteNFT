// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract gtest is ERC721Enumerable, Ownable {
  using Strings for uint256;

  string baseURI;
  string public baseExtension = ".json";
  uint256 public cost = 0 ether;
  uint256 public cost1 = 1 ether;
  uint256 public cost2 = 3 ether;
  uint256 public maxSupply = 600;
  uint256 public mintAmount = 1;
  bool public paused = false;

  constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI
  ) ERC721(_name, _symbol) {
    setBaseURI(_initBaseURI);
  }

  // internal
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  // public
  function mint() public payable {
    uint256 supply = totalSupply();
    require(!paused);
    require(supply + mintAmount <= 300);

    if (msg.sender != owner()) {
      require(msg.value >= cost);
    }

    _safeMint(msg.sender, supply + 1);
  }

  // public
  function mintPrem() public payable {
    uint256 supply = totalSupply();
    require(!paused);
    require(supply + mintAmount <= 500);

    if (msg.sender != owner()) {
      require(msg.value >= cost1);
    }
    
    _safeMint(msg.sender, supply + 1);
  }

  // public
  function mintLeg() public payable {
    uint256 supply = totalSupply();
    require(!paused);
    require(supply + mintAmount <= maxSupply);

    if (msg.sender != owner()) {
      require(msg.value >= cost2);
    }

    _safeMint(msg.sender, supply + 1);
  }

  function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
  }

  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );
    

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
        : "";
  }

  function setCost(uint256 _newCost) public onlyOwner {
    cost = _newCost;
  }

  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
    baseExtension = _newBaseExtension;
  }

  function pause(bool _state) public onlyOwner {
    paused = _state;
  }
 
  function withdraw() public payable onlyOwner {
    (bool os, ) = payable(owner()).call{value: address(this).balance}("");
    require(os);
  }
}