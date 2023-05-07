import React, { useEffect, useRef, useState } from "react";


import "../css/search.css";
import CustomerService from "../../services/CustomerService";
import RestaurantService from "../../services/RestaurantService";
import Restaurant from "./Restaurant";
import RequestService from "../../services/RequestService";

const EXPIRY_TIME = 3600000;

function Search() {

    const [restaurantsData, setRestaurantData] = useState([]);
    const [params, setParams] = useState({ "rpin": 0, "feed": 0, "weight": 0 });
    const [state, setState] = useState(0)//0 for all 1 for search
    const [selectedRestaurants, setSelectedRestaurants] = useState([]);
    const [selectedRestaurantsFeed, setSelectedRestaurantsFeed] = useState(0);
    const [restaurantCapacity, setRestaurantCapacity] = useState({});
    const [totalFeed, setTotalFeed] = useState(0);
    const [note, setNote] = useState("");

    useEffect(() => {
        if (restaurantsData.length < 3) {
            document.getElementsByClassName("search-restaurants-list")[0].style.display = "flex";
        }
        else {
            document.getElementsByClassName("search-restaurants-list")[0].style.display = "grid";
        }
        if (state === 0) {
            CustomerService.getAllRestaurants().then(async data => {
                if (JSON.stringify(data["restaurants"]) !== JSON.stringify(restaurantsData)) {
                    await data["restaurants"].forEach(async (data) => {
                        if (Date.now() - data["rmenu"][0]["uploaded"]["time"] > EXPIRY_TIME) {
                            var newExpiredMenu = {
                                "rmenu": data["rmenu"]
                            };
                            newExpiredMenu["rmenu"][0]["uploaded"]["live"] = false;
                            await RestaurantService.updateMenu(newExpiredMenu);
                        }
                    });
                    let newData = await data["restaurants"].filter((datum) => datum["rmenu"][0]["uploaded"]["live"]);
                    setRestaurantData(newData);
                }
                //main algorithm
                let newRestaurantCapacty = {};
                restaurantsData.forEach((data) => {
                    const dal = data["rmenu"][0]["Dal"]["quantity"];   //in l 120
                    const rice = data["rmenu"][0]["Dal"]["quantity"]; //in kg 120
                    const chapati = data["rmenu"][0]["Dal"]["quantity"]; //in pieces 4 reg
                    const veggie = data["rmenu"][0]["Dal"]["quantity"]; //in kg 120
                    const sweet = data["rmenu"][0]["Dal"]["quantity"];// in kg 50
                    let minPerson = 100000000;
                    if (dal !== 0)
                        minPerson = Math.min(minPerson, Math.floor(dal * 1000 / 120));
                    if (rice !== 0)
                        minPerson = Math.min(minPerson, Math.floor(rice * 1000 / 120));
                    if (chapati !== 0)
                        minPerson = Math.min(minPerson, Math.floor(chapati * 1000 / 4));
                    if (veggie !== 0)
                        minPerson = Math.min(minPerson, Math.floor(veggie * 1000 / 120));
                    if (sweet !== 0)
                        minPerson = Math.min(minPerson, Math.floor(sweet * 1000 / 50));
                    newRestaurantCapacty[data["cemail"]] = minPerson;
                });
                setRestaurantCapacity(newRestaurantCapacty);
            });
        }
        else {
            CustomerService.findRestaurant(params).then(async data => {
                if (JSON.stringify(data["restaurants"]) !== JSON.stringify(restaurantsData)) {

                    await data["restaurants"].forEach(async (data) => {
                        if (Date.now() - data["rmenu"][0]["uploaded"]["time"] > EXPIRY_TIME) {
                            var newExpiredMenu = {
                                "rmenu": data["rmenu"]
                            };
                            newExpiredMenu["rmenu"][0]["uploaded"]["live"] = false;
                            await RestaurantService.updateMenu(newExpiredMenu);


                        }
                    });
                }
                let newData = await data["restaurants"].filter((datum) => datum["rmenu"][0]["uploaded"]["live"]);
                setRestaurantData(newData);
                //main algorithm
                let newRestaurantCapacty = {};
                restaurantsData.forEach((data) => {
                    const dal = data["rmenu"][0]["Dal"]["quantity"];   //in l 120
                    const rice = data["rmenu"][0]["Dal"]["quantity"]; //in kg 120
                    const chapati = data["rmenu"][0]["Dal"]["quantity"]; //in pieces 4 reg
                    const veggie = data["rmenu"][0]["Dal"]["quantity"]; //in kg 120
                    const sweet = data["rmenu"][0]["Dal"]["quantity"];// in kg 50
                    let minPerson = 100000000;
                    if (dal !== 0)
                        minPerson = Math.min(minPerson, Math.floor(dal * 1000 / 120));
                    if (rice !== 0)
                        minPerson = Math.min(minPerson, Math.floor(rice * 1000 / 120));
                    if (chapati !== 0)
                        minPerson = Math.min(minPerson, Math.floor(chapati * 1000 / 4));
                    if (veggie !== 0)
                        minPerson = Math.min(minPerson, Math.floor(veggie * 1000 / 120));
                    if (sweet !== 0)
                        minPerson = Math.min(minPerson, Math.floor(sweet * 1000 / 50));
                    newRestaurantCapacty[data["cemail"]] = minPerson;
                });
                setRestaurantCapacity(newRestaurantCapacty);

            })
        }
    });

    const onSearch = (e) => {
        e.preventDefault();
        setState(1);
    }
    const onFetchAll = () => {
        setState(0);
    }

    const onHandleChange = (e) => {
        if (e.target.name == "pin") {
            const newParams = {
                "rpin": e.target.value,
                "feed": params["feed"],
                "weight": params["weight"]
            }
            setParams(newParams);
        }
        else if (e.target.name == "feed") {
            const newParams = {
                "rpin": params["rpin"],
                "feed": e.target.value,
                "weight": params["weight"]
            }
            setParams(newParams);
        }
        else if (e.target.name == "weight") {
            const newParams = {
                "rpin": params["rpin"],
                "feed": params["feed"],
                "weight": e.target.value
            }
            setParams(newParams);
        }
        else if (e.target.name === "note") {
            setNote(e.target.value);
        }
    }

    const onHandleFeedChange = (e) => {
        setSelectedRestaurantsFeed(e.target.value);
    }
    const onAddRestaurant = (e) => {

        let id = e.target.id;

        restaurantsData.forEach(data => {
            if (data["cemail"] === id) {

                let i = 0;
                selectedRestaurants.forEach((data) => {
                    if (data["restaurant"]["cemail"] === id) {
                        i = 1;

                    }
                });
                if (i === 0) {
                    let newFeed = parseInt(totalFeed) + parseInt(selectedRestaurantsFeed);
                    setTotalFeed(newFeed);
                    setSelectedRestaurants([...selectedRestaurants, { "restaurant": data, "feed": selectedRestaurantsFeed }]);
                }
                else {
                    alert("Already there");
                }

            }
        });

        setSelectedRestaurantsFeed(0);
    }

    const onSubmitRequests = () => {
        selectedRestaurants.forEach(async (data) => {
            let menuRequested = data["restaurant"]["rmenu"][0];

            if (data["restaurant"]["rmenu"][0]["Dal"]["quantity"] !== 0)
                menuRequested["Dal"]["quantity"] = Math.floor(data["feed"] * 120 / 1000);
            if (data["restaurant"]["rmenu"][0]["Rice"]["quantity"] !== 0)
                menuRequested["Rice"]["quantity"] = Math.floor(data["feed"] * 120 / 1000);
            if (data["restaurant"]["rmenu"][0]["Chapati"]["quantity"] !== 0)
                menuRequested["Chapati"]["quantity"] = Math.floor(data["feed"] * 4);
            if (data["restaurant"]["rmenu"][0]["Sweet"]["quantity"] !== 0)
                menuRequested["Sweet"]["quantity"] = Math.floor(data["feed"] * 50 / 1000);
            if (data["restaurant"]["rmenu"][0]["Veggie"]["quantity"] !== 0)
                menuRequested["Veggie"]["quantity"] = Math.floor(data["feed"] * 120 / 1000);
            const newRequest = {
                "destination": data["restaurant"]["cemail"],
                "feed": data["feed"],
                "note": note,
                "postedAt": Date.now(),
                "rmenu": [menuRequested]
            }
            console.log(newRequest);
            await RequestService.postRequest(newRequest).then(res=>{
                console.log(res);
            });
        });
    }

    const SelectedRestaurant = (props) => {
        return (
            <div className="selected-restaurant">
                Ordering <br />
                {props.data["restaurant"]["rname"]} <br />
                For: {props.data["feed"]} People
            </div>
        );
    }

    return (
        <div className="search">
            <div className="search-up">
                <div className="search-up-main">
                    <input type="text" name="pin" placeholder="PIN code" onChange={onHandleChange} />
                    <input type="number" name="feed" placeholder="To Feed" onChange={onHandleChange} />
                    <button onClick={onSearch}>Search</button>
                </div>
                <div className="search-up-filter">
                    <div className="left-filter">How much closer do you want?</div>
                    <input type="range" name="weight" id="weight" step={1} min={0} max={6} defaultValue={0} onChange={onHandleChange} />
                    <div className="right-filter">Weight : {params["weight"]}</div>
                </div>
            </div>
            <div className="search-down">
                <div className="search-down-restaurants">
                    <div className="search-restaurants-suggest">
                        <button onClick={onFetchAll}>FetchAll</button>
                    </div>
                    <div className="search-restaurants-list">
                        {
                            restaurantsData.map((data) => {
                                if (data["rmenu"][0]["uploaded"]["live"] && (Date.now() - data["rmenu"][0]["uploaded"]["time"] < EXPIRY_TIME))
                                    return (
                                        <div className="restaurant-details">
                                            <Restaurant details={data} />
                                            <div className="restaurant-details-down">
                                                Can Feed: {selectedRestaurantsFeed}/{restaurantCapacity[data["cemail"]]} <br />
                                                <input onChange={onHandleFeedChange} type="range" name="weight" step={1} min={0} max={restaurantCapacity[data["cemail"]]} defaultValue={0} />
                                                <button onClick={onAddRestaurant} id={data["cemail"]}>Add</button>
                                            </div>
                                        </div>
                                    );
                            })
                        }

                    </div>
                </div>
                <div className="search-down-selected">
                    <div className="search-selected-head">
                        {
                            totalFeed === params["feed"] ?
                                <span style={{ color: "green" }}>
                                    Can feed: {totalFeed}/{params["feed"]} (done)
                                </span> :
                                totalFeed > params["feed"] ?
                                    <span style={{ color: "orange" }}>
                                        Can feed: {totalFeed}/{params["feed"]} (exceeding)
                                    </span> :
                                    <span style={{ color: "red" }}>
                                        Can feed: {totalFeed}/{params["feed"]} (low)
                                    </span>
                        }
                    </div>
                    <div className="search-selected-note">
                        <input type="textarea" placeholder="Enter a note" onChange={onHandleChange}/>
                    </div>
                    <div className="search-selected-btn">
                        <button onClick={onSubmitRequests}>Submit</button>
                    </div>
                    <br />
                    <hr />
                    <div className="search-selected-details">
                        {
                            selectedRestaurants.map((data) => {
                                return (
                                    <SelectedRestaurant data={data} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;