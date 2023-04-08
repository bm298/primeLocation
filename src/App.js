import PropertyCard from './propertyCard';
import Pagination from './pagination';
import './App.css';
import './listStyle.css';
import './mobResponsive.css';
import ReactSlider from 'react-slider';
import { useState, useEffect, useRef } from 'react'; 
import {MdOutlinePhoneIphone} from 'react-icons/md';
import {IoLogoGooglePlaystore} from 'react-icons/io5';
import {FaApple} from 'react-icons/fa';
import {FaTwitter,FaFacebookF} from 'react-icons/fa';
import {BsFillGrid3X3GapFill} from 'react-icons/bs';
import {FiFilter} from 'react-icons/fi';
import {AiOutlineUnorderedList} from 'react-icons/ai';
import addProperty from './addProperty';


function App() {

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(3000);

  const [totalProperties, setTotalProperties] = useState (addProperty)
  const [propertiesList, setPropertiesList] = useState(addProperty)

  const [gridCard, setGridCard]= useState(true)

  const [currentPage, setCurrentPage]= useState(1)
  const [postsPerPage, setPostsPerPage]= useState(6)
  const [searchValue, setSearchValue]= useState("")
  const [filterMenu, setFilterMenu]= useState(false)
  let filterSection = useRef(null)
  const [pageResults, setPageResults]= useState(addProperty)

  function goToFilterSection (){
    window.scrollTo({
    top: filterSection.current.offsetTop
    })
  }

  useEffect(() => {
    priceFilter()
    console.log("min/max run")
    }, [min,max]);
       
  useEffect(() => {
    if(searchValue===""){
      setPageResults(propertiesList)
      console.log("search value run")
      postsSet()
      priceFilter()   
    }
  }, [searchValue]);

    useEffect( () => {
      postsSet()
      console.log("current page run")
    }, [currentPage])

  function postsSet(){
    const lastPostIndex= currentPage * postsPerPage
    const firstPostIndex= lastPostIndex - postsPerPage
    let totalPropertiesPaginate= propertiesList.slice(firstPostIndex, lastPostIndex)
    console.log("TPPaginate",totalPropertiesPaginate)
    setTotalProperties(totalPropertiesPaginate)
  }

  function priceFilter(){

    if(!{min} && !{max}){
      postsSet();
      return;
    }

    let tempTotalProperty= propertiesList.map ((property) =>{
      return (min>property.propPrice || max<property.propPrice ) ? {...property, show: false } : {...property, show:true}
        })
        tempTotalProperty= tempTotalProperty.filter((property) => {
          if (property.show===true){
            return property
          }
        })
        console.log("tempInPrice:",tempTotalProperty)
        console.log("totalPropPrice:",totalProperties)
        setTotalProperties(tempTotalProperty) 
        setPageResults(tempTotalProperty)
           
    } 

  function thumbFunc(){
    setSearchValue("")
  }
  
  function mainSearch(e){
    let search= e.target.value.toLowerCase()
    setSearchValue(search)

    if(!search){
      postsSet();
      return;
    }

    let tempTotalProperty= propertiesList.map ((property) =>{
      return (min>property.propPrice || max<property.propPrice ) ? {...property, show: false } : {...property, show:true}
        })

        tempTotalProperty= tempTotalProperty.filter((property) => {
          if (property.show===true && property.propLocation.toLowerCase().includes(search)){
            return property
          }
        })
        console.log("temp:",tempTotalProperty)
        console.log("totalProp:",totalProperties)
        console.log("mainsearch run")
        console.log(e.target.value)
        console.log(e.target.value)
        // console.log(propertiesList)
        setPageResults(tempTotalProperty)
        setTotalProperties(tempTotalProperty)
  }

  console.log(searchValue)
console.log("TP OUTSIDE",totalProperties)

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

    {/* Filter Menu */}
    <div style={{position:"relative"}} onClick={goToFilterSection}>
      <FiFilter className={filterMenu ? 'filterMenuOpen' : "filterMenuOpenDisabled" }   
      onClick={() => setFilterMenu(!filterMenu) } 
      />
    </div>

  {/* MAIN SECTION */}
  <div className='main'>
    <div className={filterMenu ? 'sideBar' : "sideBarDisabled"} ref={filterSection}>
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

        <div className='facilities'><p>Facilities</p></div>

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

    {/* Filter Menu */}
    <div style={{position:"relative"}} onClick={goToFilterSection}>
    <FiFilter className={filterMenu ? 'filterMenuCloseDisabled' : "filterMenuClose" }  
    onClick={() => setFilterMenu(!filterMenu) } 
    />
    </div>

    <div className='heroSectionTitle'> {/* Beginning of Hero Title */}
        <div className='searchBar'>
          <input type="text" value={searchValue} onChange={(e) => mainSearch (e)} placeholder="Search City"/>
        </div>
    </div> {/*End of Hero Title */}

    <div className='heroSectionStats'>
      
      <div className='numberResults'>
        <p>{pageResults.length} results found</p>
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
          {totalPropertyInfo}
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
<div style={{ backgroundColor:"rgb(1, 1, 56)"}}>
  <div className='footer'>
      <div className='footerDownloadApp'>
        <div><MdOutlinePhoneIphone className='MdOutlinePhoneIphone' /></div>
        <div className='footerDownloadAppInfo'>
          <h4 id='footer-h4'>Download Prime Location App</h4>
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
</div>
  
  <div className='copyright'><p>© Bilal Musa 2023</p></div>

</div> //***End of Container***

  );
}

export default App;
