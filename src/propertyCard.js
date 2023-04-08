import React from "react"
import App from './App';
import {ImLocation} from 'react-icons/im';
import { icons } from "react-icons/lib/esm/iconsManifest";
import {MdOutlineSpaceDashboard} from 'react-icons/md';
import {GiSofa} from 'react-icons/gi';
import {FaBed} from 'react-icons/fa';



export default function propertyCard(props) {

    return(
        <div className={props.gridCard ? "eachProp" : "eachPropList"} key={props.propKey}>
            <div className={ props.gridCard ? 'eachPropImage' : 'eachPropImageList'}>
                {/* to run locally change to ../propImages */}
                <img src={`propImages/${props.propPic}`} className= {props.gridCard ? "propertyImage" : "propertyImageList"} ></img>
                <p className={ props.gridCard ? "eachPropPropName" : "eachPropPropNameList"}>{props.propName}</p>
            
            <div className={props.gridCard ? "hoverCardContainer" : "hoverCardContainerList"}>
                
                <div className="hoverCardInfo">
                    <p id={props.gridCard ? "hoverCardName" : "hoverCardNameList"}>{props.postedBy}</p>
                    <p>Posted On {props.datePosted}</p>
                </div>

                <div className="hoverCardInfoStats">
                    <p className="statsValue"><MdOutlineSpaceDashboard className="statsValueIcons"/> {props.floorSpace}m²</p>
                    <p className="statsValue"><GiSofa className="statsValueIcons"/> {props.furnished}</p>
                    <p className="statsValue"><FaBed className="statsValueIcons"/> {props.rooms} Bedrooms</p>
                </div>
                <div></div>

            </div> {/* End of hoverCardContainer */}


            </div> {/* End of Prop image */}


            <div className={props.gridCard ? "eachPropInfo" : "eachPropInfoList"}>
                <p className="eachPropInfoPrice">£{props.propPrice} /month</p>
                <p className={props.gridCard ? "eachPropInfoLocation" : "eachPropInfoLocationList"}><ImLocation className="ImLocation" /> {props.propLocation}</p>
            </div>

        </div>
    )
}