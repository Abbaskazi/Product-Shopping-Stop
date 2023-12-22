import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useState, useEffect, useRef } from 'react';
import StarRating from './StarRating';
import Modal from 'react-modal';
import Cart from './Cart'; 
import '../Style/Home.css'

Modal.setAppElement('#root');

const Home = ({ onLogout }) => {
    const brands = [
        'Apple',
        'Samsung',
        'OPPO',
        'Huawei',
        'Microsoft Surface',
        'Infinix',
        'HP Pavilion',
        'Impression of Acqua Di Gio',
        'Royal_Mirage',
        'Fog Scent Xpressio',
        'Al Munakh',
        'Lord - Al-Rehab',
        'L\'Oreal Paris',
        'Hemani Tea',
        'Dermive',
        'ROREC White Rice',
        'Fair & Clear',
        'Saaf & Khaas',
        'Bake Parlor Big',
        'Baking Food Items',
        'fauji',
        'Dry Rose',
        'Boho Decor',
        'Flying Wooden',
        'LED Lights',
        'luxury palace',
        'Golden'
    ];

    const categories = [
        'smartphones',
        'laptops',
        'fragrances',
        'skincare',
        'groceries',
        'home-decoration'
    ];
    const [appliedFilter, setAppliedFilter] = useState(null);
    const sliderRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBrandFilter, setSelectedBrandFilter] = useState('');
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false); 
    const [isFilterOpen, setIsFilterOpen] = useState(false); 
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data.products)) {
                    setProducts(data.products);
                } else {
                    console.error('Error: The response data.products is not an array.', data);
                }
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
    };

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };

    const handleAddToCart = (product) => {
        setCartItems((prevItems) => [...prevItems, product]);
    };

    const handleRemoveFromCart = (itemToRemove) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemToRemove.id));
    };

    const handleToggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };


    const handleToggleFilter = () => {
        if (!isFilterOpen) {
            setSelectedBrandFilter(selectedBrand);
            setSelectedCategoryFilter(selectedCategory);
            setPriceRange({
                min: priceRange.min !== '' ? priceRange.min : '',
                max: priceRange.max !== '' ? priceRange.max : '',
            });
        }
        setIsFilterOpen(!isFilterOpen);
    };

    const handleApplyFilter = () => {
        const filteredProducts = products.filter((product) => {
            const brandMatch = !selectedBrandFilter || product.brand === selectedBrandFilter;
            const categoryMatch =
                !selectedCategoryFilter || product.category === selectedCategoryFilter;
            const priceMatch =
                (!priceRange.min || product.price >= parseFloat(priceRange.min)) &&
                (!priceRange.max || product.price <= parseFloat(priceRange.max));

            return brandMatch && categoryMatch && priceMatch;
        });


        setProducts(filteredProducts);

        setAppliedFilter({
            brand: selectedBrandFilter,
            category: selectedCategoryFilter,
            priceRange: priceRange,
        });

        setIsFilterOpen(false);
    };

    const handleClearFilter = () => {
        setAppliedFilter(null);
        fetch('https://dummyjson.com/products')
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data.products)) {
                    setProducts(data.products);
                } else {
                    console.error('Error: The response data.products is not an array.', data);
                }
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    };

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery)
    );

    return (
        <div>
            <div className="header">
                <h2>Shopping Center</h2>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <button onClick={handleToggleFilter}>Filter <i class='bx bxs-filter-alt' ></i></button>
                <button onClick={handleToggleCart}>Cart <i class='bx bxs-cart'></i></button>
                <button onClick={onLogout}>Logout</button>
            </div>
            <div>
                <div className="selectedFilters">
                    {appliedFilter && (
                        <div>
                            <span>
                                Filter Applied: Brand - {appliedFilter.brand}, Category - {appliedFilter.category},{' '}
                                Price Range - {appliedFilter.priceRange.min} to {appliedFilter.priceRange.max}
                                <button className='filterClear' onClick={handleClearFilter}>Clear Filter</button>
                            </span>
                        </div>
                    )}
                </div>
                <h2 className='Product-Heading'>Product List</h2>
                <div className="products">
                    <ul>
                        {filteredProducts.map((product) => (
                            <div className="product-container" key={product.id} onClick={() => openModal(product)}>
                                <div className="thumbnail-img">
                                    <img src={product.thumbnail} alt="Thumbnail" />
                                </div>
                                <div className="desc">
                                    <h3 className="Products-title">{product.title}</h3>
                                    <h4 className="Products-price"><i className='bx bx-rupee'></i>{product.price}</h4>
                                    <div style={{ display: 'flex' }} className='Products-rating'>
                                        <span>{product.rating}</span><StarRating rating={product.rating} />
                                    </div>
                                </div>
                                <button className='CartBtn' onClick={() => handleAddToCart(product)}>Add to Cart</button>
                                <br />
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Product Details"
                
            >
                {selectedProduct && (
                    <div>
                        <div className="filterModalHead">
                        <h2>{selectedProduct.title}</h2>
                        <button onClick={closeModal}><i class='bx bx-x' ></i></button>
                        </div>
                        <div className="product-Images">
                        <Slider ref={sliderRef}>
                            {selectedProduct.images.map((image, index) => (
                                <div key={index + 1} className='Product-img'>
                                    <img src={image} alt={selectedProduct.title} />
                                </div>
                            ))}
                        </Slider>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <button className='Prevbtn' onClick={() => sliderRef.current.slickPrev()}><i class='bx bx-left-arrow-alt' ></i></button>
                            <button className="NextBtn" onClick={() => sliderRef.current.slickNext()}><i class='bx bx-right-arrow-alt' ></i></button>
                        </div>
                        <p className='Product-desc-Modal'>{selectedProduct.description}</p>
                        <p className='Product-price-Modal'>
                            <i className="bx bx-rupee"></i>
                            {selectedProduct.price}
                        </p>
                        <div className='Rating'>
                            <span>{selectedProduct.rating}</span>
                            <StarRating rating={selectedProduct.rating} />
                        </div>
                        <button className='Add-Cart-Btn-Modal' onClick={() => handleAddToCart(selectedProduct)}>
                            Add to Cart
                        </button>
                        
                    </div>
                )}
            </Modal>

            {/* Modal for Cart */}
            <Modal
                isOpen={isCartOpen}
                onRequestClose={handleToggleCart}
                contentLabel="Shopping Cart"
            >
                <div className="filterModalHead">
                <h2>Shopping Cart</h2>
                <button onClick={handleToggleCart}><i class='bx bx-x' ></i></button>
                </div>
                <Cart cartItems={cartItems} onRemoveItem={handleRemoveFromCart} />
            </Modal>

            {/* Modal for Filter */}
            <Modal
                isOpen={isFilterOpen}
                onRequestClose={handleToggleFilter}
                contentLabel="Filter Products"
            >
                <div className="filterModalHead">
                <h2>Filter Products</h2>
                <button onClick={handleToggleFilter}><i class='bx bx-x' ></i></button>
                </div>
                <div className="filter">
                <label>
                    Brand:
                    <div>
                        {brands.map((brand) => (
                            <label key={brand}>
                                <input
                                    type="radio"
                                    name="brandFilter"
                                    value={brand}
                                    checked={selectedBrandFilter === brand}
                                    onChange={() => setSelectedBrandFilter(brand)}
                                />
                                {brand}
                                <br/>
                            </label>
                        ))}
                    </div>
                </label>
                
                <label>
                    Category:
                    <div>
                        {categories.map((category) => (
                            <label key={category}>
                                <input
                                    type="radio"
                                    name="categoryFilter"
                                    value={category}
                                    checked={selectedCategoryFilter === category}
                                    onChange={() => setSelectedCategoryFilter(category)}
                                />
                                {category}
                                <br />
                            </label>
                        ))}
                    </div>
                </label>
                
                <label>
                    Price Range:
                    <br />
                    <input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    />
                    <br />
                    <input
                        type="text"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    />
                </label>
                <br />
                </div>
                <div className="buttons">
                <button onClick={handleApplyFilter}>Apply Filter</button>
                <button onClick={handleToggleFilter}>Close Filter</button>
                </div>
            </Modal>
        </div>
    );
};

export default Home;
