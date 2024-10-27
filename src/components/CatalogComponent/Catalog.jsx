import style from './Catalog.module.css'
import { Card } from '../CardComponent/Card'
import { Category } from '../CategoryComponent/CategoryComponent'
import { products } from '../../data/data'
import { Search } from '../SearchComponent/SearchComponent'
import { useState } from 'react'

export function Catalog() {
    const [query, setQuery] = useState('');
    const [sorting, setSorting] = useState('');
    const [category, setCategory] = useState(0)
    function sort(e) {
        setSorting(e.target.value)
    }
    function handleChange(e) {
        setQuery(e.target.value);
    }
    const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(query.toLowerCase())
        && (product.category == category || category == 0);
    })

    const sortProduct = (sorting, products) => {
        switch (sorting) {
            case 'price_up':
                return [...products].sort((a, b) => a.price - b.price);
            case 'price_down':
                return [...products].sort((a, b) => b.price - a.price);
            case 'count_up':
                return [...products].sort((a, b) => a.count - b.count);
            case 'count_down':
                return [...products].sort((a, b) => b.count - a.count);
            default:
                return products;
        }
    }

    const sortedProducts = sortProduct(sorting, filteredProducts)
    return (
        <>
            <div className={style.catalog}>
                <p className={style.catalog_title}>Каталог товаров</p>
                <div className={style.category}>
                <button
                onClick={() => setCategory(0)}
                className={category === 0 ? style.active : ''}>
                Все товары
            </button>
            <button
                onClick={() => setCategory(1)}
                className={category === 1 ? style.active : ''}>
                Краны
            </button>
            <button
                onClick={() => setCategory(2)}
                className={category === 2 ? style.active : ''}>
                Души
            </button>
            <button
                onClick={() => setCategory(3)}
                className={category === 3 ? style.active : ''}>
                Смесители
            </button>
                </div>
                <Search handleChange={handleChange} />
                <select className={style.sort} onChange={sort}>
                    <option value="price_up" >Цена по убыванию</option>
                    <option value="price_down">Цена по возрастанию</option>
                    <option value="count_up" >Количество по убыванию</option>
                    <option value="count_down">Количество по возрастанию</option>
                </select>
            </div>
            <div className={style.catalog_grid}>
                {
                    sortedProducts.length ?
                        sortedProducts.map((product, index) => {
                            return (
                                <Card {...product} />
                            )
                        })
                        :
                        <p className="error">Ничего не найдено по запросу "{query}"</p>
                }
            </div>
        </>
    )
}