import logo from './logo.svg';
import PropertyCard from './propertyCard';
import Pagination from './pagination';
import './App.css';
import './listStyle.css';
import ReactSlider from 'react-slider';
import { useState, useEffect } from 'react';  
import AddProperty from './addProperty';
import {MdOutlinePhoneIphone} from 'react-icons/md';
import {IoLogoGooglePlaystore} from 'react-icons/io5';
import {FaApple} from 'react-icons/fa';
import {FaTwitter,FaFacebookF} from 'react-icons/fa';
import {BsFillGrid3X3GapFill} from 'react-icons/bs';
import {AiOutlineUnorderedList, AiTwotoneAlert} from 'react-icons/ai';
import addProperty from './addProperty';

//cud do aternary so if totalproperrties.id < 55 ? gime this : or this 

function App() {

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(3000);

  const [totalProperties, setTotalProperties] = useState (addProperty)

  const [gridCard, setGridCard]= useState(true)

  const [currentPage, setCurrentPage]= useState(1)
  const [postsPerPage, setPostsPerPage]= useState(6)

  const [searchValue, setSearchValue]= useState("")

  useEffect(() => {
    priceFilter()
       }, [min,max]);  

  useEffect(() => {
   postsSet()
    }, [searchValue] );

  function postsSet(){
    const lastPostIndex= currentPage * postsPerPage
    const firstPostIndex= lastPostIndex - postsPerPage
    let totalPropertiesPaginate= totalProperties.slice(firstPostIndex, lastPostIndex)
    setTotalProperties(totalPropertiesPaginate)
    }

  function priceFilter(){
    let tempTotalProperty= addProperty.map ((property) =>{
      return (min>property.propPrice || max<property.propPrice ) ? {...property, show: false } : {...property, show:true}
        })
        tempTotalProperty= tempTotalProperty.filter((property) => {
          if (property.show===true){
            return property
          }
        })
        setTotalProperties(tempTotalProperty)    
    }

  function thumbFunc(){
    setSearchValue("")
  }
  
  function mainSearch(e){
    let search= e.target.value.toLowerCase()
    setSearchValue(search)

    let tempTotalProperty= addProperty.map ((property) =>{
      return (min>property.propPrice || max<property.propPrice ) ? {...property, show: false } : {...property, show:true}
        })

        tempTotalProperty= tempTotalProperty.filter((property) => {
          if (property.show===true && property.propLocation.toLowerCase().includes(search)){
            return property
          }
        })

        setTotalProperties(tempTotalProperty)    
    // let filteredSearchProp= addProperty.filter((prop) => {
    //   if (prop.propLocation.toLowerCase().includes(search)){
    //     return prop
    //   }
    // }) 
    // setTotalProperties(filteredSearchProp)
  }

    function selectOnChange(e){
      if (e.target.value === "Price Descending"){
        setTotalProperties(prevproperties => {
          return ([...prevproperties].sort(function compareFunc (a,b) {
            return b.propPrice-a.propPrice
            }))
        })
      }
      else if (e.target.value === "Price Ascending"){
        setTotalProperties(prevproperties => {
          return ([...prevproperties].sort(function compareFunc (a,b) {
            return a.propPrice-b.propPrice
            }))
        })
      }
    }

    function gridViewChange(){
      setGridCard(true)
    }

    function listViewChange(){
      setGridCard(false)
    }

  let totalPropertyInfo = totalProperties.map(eachProp => {
    return ( 
          <div className={ gridCard ? '' : "eachPropOuterList"}>
        <PropertyCard
            propKey={eachProp.propKey}
            propPic={eachProp.propPic}
            propName={eachProp.propName}
            propPrice={eachProp.propPrice}
            propLocation={eachProp.propLocation}
            postedBy={eachProp.postedBy}
            datePosted={eachProp.datePosted}
            floorSpace={eachProp.floorSpace}
            furnished={eachProp.furnished}
            rooms={eachProp.rooms}
            gridCard= {gridCard}
        />
        </div>
    )
    })   
  
  return (
<div className='container'>

  {/* NAVBAR SECTION */}
  <div className='navBar'>

    <div className='navContents'>

      <div id='logo'>
        <h3>Prime Location</h3>
      </div>

      <div className='navItems'>
        <ul>
          <li><a className='navItemsList'>Create Ads</a></li>
          <li><a className='navItemsList'>About Us</a></li>
          <li><a className='navItemsList'>Log In</a></li>
          <li><a id='navItemsBtn' className='navItemsList'>Register</a></li>
        </ul>
      </div>
    </div>
  </div>  {/* END OF NAVBAR SECTION */}

  {/* MAIN SECTION */}
  <div className='main'>
    <div className='sideBar'>
      <div className='innerSidebar'>
        <form>
          <h4 id='filter'>FILTER</h4>

          <div className='filterDropdowns'>
            <select className="neighbourhood" name='neighbourhood'>
              <option value="">Neighbourhood</option>
            </select>
          </div>
          <div className='filterDropdowns'>
            <select className="propertyType" name='propertyType'>
              <option value="">Property Type</option>
              <option value="house">House</option>
              <option value="flat">Flat</option>
              <option value="bungalow">Bungalow</option>
            </select>
          </div>
          <div className='filterDropdowns'>
            <select className="bedrooms" name='Bedrooms'>
              <option value="">Bedrooms</option>
              <option value="1">1 Bed</option>
              <option value="2">2 Bed</option>
              <option value="2">3 Bed</option>
              <option value="2">4 Bed</option>
              <option value="2">5+ Bed</option>
            </select>
          </div>

        <div className='sliderContainer'>
          <div className='eachSlider'>
            <p>Price</p>
            <div><ReactSlider 
                  defaultValue={[min, max]}
                  className= "slider"
                  trackClassName='tracker'
                  min={0}
                  max={3000}
                  minDistance={50}
                  step={50}
                  withTracks= {true}
                  pearling={true}
                  renderThumb={(props) =>{
                    return <div {...props} className="thumb" onClick={thumbFunc}></div>
                  }}
                  renderTrack={(props) =>{
                    return <div {...props} className="track"></div>
                  }}
                  onChange={([min,max]) => {
                    setMin(min);
                    setMax(max);
                  
                  }}
                  
                  />
              <div className='sliderValues'>
                <span id='minValue'>£{min}</span>
                <span id='maxValue'>£{max}</span>
              </div>
            </div>
          </div>
        </div>

        <div><p>Facilities</p></div>

        <div className="formBoxes">
          <span id='wordBoxes'><label htmlFor="elevator">Elevator</label></span>
            <span id='boxes'>
                        <input
                          className='checkBox'
                          id="elevator"
                          type="checkbox"
                          name="elevator"
                          // onChange={handleChange}
                          // checked={formData.joinMembership}
                          />
              </span>
        </div>

        <div className="formBoxes">
          <span id='wordBoxes'><label htmlFor="elevator">Pool</label></span>
            <span id='boxes'>
                        <input
                          className='checkBox'
                          id="elevator"
                          type="checkbox"
                          name="elevator"
                          // onChange={handleChange}
                          // checked={formData.joinMembership}
                          />
              </span>
        </div>

        <div className="formBoxes">
          <span id='wordBoxes'><label htmlFor="elevator">Bath tub</label></span>
            <span id='boxes'>
                        <input
                          className='checkBox'
                          id="elevator"
                          type="checkbox"
                          name="elevator"
                          // onChange={handleChange}
                          // checked={formData.joinMembership}
                          />
              </span>
        </div>

        <div className="formBoxes">
          <span id='wordBoxes'><label htmlFor="elevator">Fireplace</label></span>
            <span id='boxes'>
                        <input
                          className='checkBox'
                          id="elevator"
                          type="checkbox"
                          name="elevator"
                          // onChange={handleChange}
                          // checked={formData.joinMembership}
                          />
              </span>
        </div>

        <div className="formBoxes">
          <span id='wordBoxes'><label htmlFor="elevator">Separate Shower</label></span>
            <span id='boxes'>
                        <input
                          className='checkBox'
                          id="elevator"
                          type="checkbox"
                          name="elevator"
                          // onChange={handleChange}
                          // checked={formData.joinMembership}
                          />
              </span>
        </div>

        </form>
      </div>
    </div>
    
{/* HERO SECTION */}

<div className={ gridCard ? 'heroSection' : "heroSectionList"}>

    <div className='heroSectionTitle'> {/* Beginning of Hero Title */}
        <div className='searchBar'>
          <input type="text" value={searchValue} onChange={(e) => mainSearch (e)} placeholder="Search City"/>
        </div>
    </div> {/*End of Hero Title */}

    <div className='heroSectionStats'>
      
      <div className='numberResults'>
        <p>{totalProperties.length} results found</p>
      </div>

      <div className='sortSection'>

          <div className='sortBox'>
            <select className='sortBoxContainer' onChange={selectOnChange}>
              <option>Price Ascending</option>
              <option>Price Descending</option>
            </select>
          </div>

          <div className={gridCard ? 'AiOutlineUnorderedList':'AiOutlineUnorderedListGrey'}  onClick={listViewChange}><AiOutlineUnorderedList /></div>
          <div className={gridCard ? 'BsFillGrid3X3GapFillGrey':"BsFillGrid3X3GapFill"} onClick={gridViewChange}><BsFillGrid3X3GapFill /></div>

      </div>

    </div>

    <div className='totalPropertyInfoContainer'> {/* Beginning of propertyInfo */}

        <div className={ gridCard ? 'totalPropertyInfo' : "totalPropertyInfoList"}>
          {totalPropertyInfo }
        </div>

    </div> {/* End of propertyInfo */}

      <div className='pageCounter'>
        <Pagination  
          totalProperties= {totalProperties}
          postsPerPage= {postsPerPage}
          setCurrentPage= {setCurrentPage}
          currentPage= {currentPage}
          addProperty={addProperty}
          setTotalProperties= {setTotalProperties}
        />
      </div>
      


</div> {/*End of hero section*/}



  </div> {/*End of Main section*/}

  {/* FOOTER SECTION */}
  <div className='footer'>
      <div className='footerDownloadApp'>
        <div><MdOutlinePhoneIphone className='MdOutlinePhoneIphone' /></div>
        <div className='footerDownloadAppInfo'>
          <h4 id='footer-h4'>Download Prime Locaiton App</h4>
          <p id='footer-p-info'>Use our app to have 11,298 rental properties at hand</p>
          <div className='appBtns'>
              <button id='googleBtn'><IoLogoGooglePlaystore className='IoLogoGooglePlaystore' /> Playstore </button>
              <button id='appleBtn'><FaApple className='FaApple' />App Store</button>
          </div>
          <div className='footerIcons'>
            <FaFacebookF className='facebookIcon'/>
            <FaTwitter className='twitterIcon' />
          </div>
        </div>
      </div>

      <div className='footerInfo'>
          <div className='tenants'>
            <p className='listHeaders'>For Tenants</p>
            <ul className='footerList'>
              <li><a>About Paranius</a></li>
              <li><a>Sign Up For Free</a></li>
              <li><a>This Is Us</a></li>
              <li><a>Paranius App</a></li>
              <li><a>About Paranius</a></li>
            </ul>
          </div>

          <div className='advertisers'>
              <p className='listHeaders'>For Advertisers</p>
              <ul className='footerList'>
                <li><a>About Paranius</a></li>
              </ul>
          </div>
      </div>
  </div> {/*End of Footer */}

  
  <div className='copyright'><p>© Bilal Musa 2023</p></div>

</div> //***End of Container***

  );
}

export default App;
