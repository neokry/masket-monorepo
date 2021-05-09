// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Masket is AccessControl {
    event ProductCreated(uint productId, string metadata, uint price, address sellerAddres);
    event BuyerUpdated(address buyerAddress, string metadata);
    event ProductPurchased(uint productId, address buyer);
    
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    
    struct Product {
        string productMetadata;
        uint price;
        address payable seller;
    }
    
    mapping(uint => Product) productIdToProduct;
    mapping(address => string) buyerMetadata;
    
    using Counters for Counters.Counter;
    Counters.Counter private _productIDs;
    
    modifier onlyAdmin() {
        require(hasRole(ADMIN_ROLE, msg.sender), "Admin access required");
        _;
    }
    
    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }
    
    function createProduct(string memory _productMetadata, uint _price, address payable _seller) onlyAdmin public {
        _productIDs.increment();
        uint prdID = _productIDs.current();
        
        Product memory prd = Product(_productMetadata, _price, _seller);
        productIdToProduct[prdID] = prd;

        emit ProductCreated(prdID, _productMetadata, _price, _seller);
    }
    
    function setBuyerMetadata(string memory _buyerMetadata) public {
        buyerMetadata[msg.sender] = _buyerMetadata;
        emit BuyerUpdated(msg.sender, _buyerMetadata);
    }
    
    function purchaseProduct(uint _productId) payable public {
        bytes memory data = bytes(buyerMetadata[msg.sender]);
        Product memory product = productIdToProduct[_productId];
        require(data.length != 0, "Buyer has no metadata");
        require(product.price == msg.value, "Wrong amount sent");
        product.seller.transfer(product.price);
        emit ProductPurchased(_productId, msg.sender);
    }
}