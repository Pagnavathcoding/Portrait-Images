import React, { useState, useEffect } from 'react';
import left from './Images/left.svg';
import right from './Images/right.svg';
import close from './Images/close.svg';
function App() {
    const [search, setSearch] = useState("");
    const [enter, setEnter] = useState("mountain");
    const [image, setImage] = useState([]);
    const [slide, setSlide] = useState([]);
    let [counterSlide, setCounterSlide] = useState(0);
    const [toggle, setToggle] = useState(false);
    const [result, setResult] = useState(0);
    let [page, setPage] = useState(1);
    useEffect(() => {
        async function portraitImages() {
            const res = await fetch(`https://api.pexels.com/v1/search/?page=${page}&per_page=80&query=${enter}`, {
                headers: {
                    Authorization: "563492ad6f91700001000001bee8180d44724488b18ceb9b707bcc64"
                }
            });
            return res.json().then((data) => {
                const photo = data.photos;
                let arr = [];
                for (let index = 0; index < photo.length; index++) {
                    arr.push(photo[index].src.portrait);
                }
                setImage(photo);
                setSlide(arr);
                console.log(data.total_results);
                setResult(data.total_results);
            }).catch((err) => {
                return err;
            })
        }
        portraitImages()
    }, [enter, page]);
    function handleChange(e) {
        setSearch(e.target.value);
    }
    function enterSubmit(e) {
        if (e.key === "Enter") {
            setEnter(search);
            setCounterSlide(0);
        }
    }
    function clickSubmit() {
        setEnter(search);
        setCounterSlide(0);
    }
    const style = {
        slide: {
            display: !toggle ? "none" : "flex"
        },
    }
    function toggleShow() {
        setToggle(!toggle);
    }
    function decrementSlide() {
        if (counterSlide < 1) {
            setCounterSlide(counterSlide = slide.length)
        }
        setCounterSlide(counterSlide - 1);
    }
    function incrementSlide() {
        setCounterSlide(counterSlide + 1)
        if (counterSlide >= slide.length - 1) {
            setCounterSlide(0)
        }
    }
    function prevPage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }
    function nextPage() {
        if (page < result / image.length) {
            setPage(page + 1);
        }
    }
    let endPage = Math.floor(result / image.length);
    return (
        <main id="top">
            <header>
                <h1>Portrait Images</h1>
                <div className="search">
                    <input type="text" placeholder="Search images..." value={search} onChange={handleChange} onKeyPress={enterSubmit} />
                    <button onClick={clickSubmit}>🔍</button>
                </div>
            </header>
            <div className="title">
                <div className="search-infos">
                    <h3>Search: </h3>
                    <p>#{enter}</p>
                </div>
                <div className="slide-show">
                    <button onClick={toggleShow}>Slide Show</button>
                </div>
            </div>
            <div className="slide" style={style.slide}>
                <div className="counter">
                    <p>{counterSlide + 1}/{slide.length}</p>
                </div>
                <div className="close" onClick={toggleShow}>
                    <img src={close} alt="close" />
                </div>
                <div className="left">
                    <button onClick={decrementSlide}><img src={left} alt="left" /></button>
                </div>
                <div className="slide-image">
                    <img src={slide[counterSlide]} />
                </div>
                <div className="right">
                    <button onClick={incrementSlide}><img src={right} alt="right" /></button>
                </div>
            </div>
            <section className="container">
                {
                    image.map((data) => {
                        return (
                            <div key={data.id} className="image">
                                <img src={data.src.portrait} alt={data.photographer} />
                            </div>
                        )
                    })
                }
            </section>
            <div className="page">
                <a href="#top"><button onClick={prevPage}><img src={left} alt="prev" /> Prev</button></a>
                <p>Pages: {page < 10 ? "0" + page : page}/{endPage < 10 ? "0" + endPage : endPage}</p>
                <a href="#top"><button onClick={nextPage}>Next <img src={right} alt="prev" /></button></a>
            </div>
            <footer>
                <p>&copy; 2021 Portrait Images, made by <a href="https://github.com/Pagnavathcoding">Pagnavath</a>.</p>
            </footer>
            <div className="top">
                <a href="#top"><button><img src={right} alt="to-top" /></button></a>
            </div>
        </main>
    )
}
export default App;