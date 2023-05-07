import React from "react";

const EXPIRY_TIME = 3600000;


function Restaurant(props) {

    const URL_r = {
        "Dal": "https://www.vegrecipesofindia.com/wp-content/uploads/2021/02/dal-fry.jpg",
        "Rice": "https://www.vegrecipesofindia.com/wp-content/uploads/2022/06/how-to-cook-basmati-rice-2.jpg",
        "Chapati": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/2_Chapati_warm_and_ready_to_be_eaten.jpg/375px-2_Chapati_warm_and_ready_to_be_eaten.jpg",
        "Veggie": "https://www.vegrecipesofindia.com/wp-content/uploads/2010/06/mix-veg-recipe-2.jpg",
        "Sweet": "https://c.recipeland.com/images/r/22063/e1f83d693f535c6923bf_1024.jpg"
    }

    const RestaurantMenu = (props) => {
        if (props.item[props.type]["name"].length > 0) {
            return (
                <div className="ritem-mid">
                    <div className="ritem-mid-img">
                        <img src={URL_r[props.type]} />
                    </div>
                    <div className="ritem-mid-details">
                        {props.type}: <br /> {props.item[props.type]["name"]}
                    </div>
                </div>
            );
        }
        else {
        }

    }

    return (
        <>
            <div className="restaurant-details-up">
                <div className="restaurant-up-left">
                    <img src={props.details["rphoto"][0]} />
                </div>
                <div className="restaurant-up-right" >
                    <div className="restaurant-rname">
                        {props.details["rname"]}
                    </div>
                    <div className="restaurant-rcon" >
                        {props.details["rcon"]}

                    </div>
                    <div className="restaurant-remail">
                        {props.details["cemail"]}
                    </div>
                    <div className="restaurant-rpin">
                        PIN: {props.details["rpin"]}
                    </div>
                    <div className="restaurant-raddr">
                        {props.details["raddr"]}
                    </div>
                    <div className="restaurant-raddr">
                        Expiring in : <span style={{ color: "red" }}>{Math.floor((EXPIRY_TIME - (Date.now() - props.details["rmenu"][0]["uploaded"]["time"])) / 60000) + " min  " + Math.floor(((EXPIRY_TIME - (Date.now() - props.details["rmenu"][0]["uploaded"]["time"])) % 60000) / 1000) + " sec"}</span>
                    </div>
                </div>
            </div>
            <div className="restaurant-details-mid">
                <RestaurantMenu type="Dal" item={props.details["rmenu"][0]} />
                <RestaurantMenu type="Rice" item={props.details["rmenu"][0]} />
                <RestaurantMenu type="Chapati" item={props.details["rmenu"][0]} />
                <RestaurantMenu type="Veggie" item={props.details["rmenu"][0]} />
                <RestaurantMenu type="Sweet" item={props.details["rmenu"][0]} />
            </div>
        </>
    );
}

export default Restaurant;