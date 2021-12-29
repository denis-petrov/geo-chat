import React, {useEffect, useRef, useState} from 'react'
import '../../../assets/css/search/Search.css'
import {GeoSearchControl, OpenStreetMapProvider} from 'leaflet-geosearch'
import {connect} from 'react-redux'
import {updateCenterPosition} from '../../../store/actions/map/position/updateCenterPosition'


const search = async (event, searchReq, setAddresses) => {
    const provider = new OpenStreetMapProvider()
    const searchControl = new GeoSearchControl({
        provider,
    })
    event.target.value = searchReq
    await searchControl.autoSearch(event)
    const results = searchControl.resultList.results
    if (results !== null && results.length > 0) {
        setAddresses(results)
    }
}


const MapSearch = (props) => {

    const [addresses, setAddresses] = useState([])
    const [searchReq, setSearchReq] = useState("")
    const [isVisibleAddressList, setIsVisibleAddressList] = useState(false)

    const searchRef = useRef()
    const handleClickOutside = e => {
        if (!searchRef.current.contains(e.target)) {
            setIsVisibleAddressList(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    })

    const visibilityOfAddressList = (isVisibleAddressList) ? "" : "hidden"
    const addressList = (
        <div className={"search__address_list " + visibilityOfAddressList} ref={searchRef}>
            <div className={"p-2"}>
                {addresses.map((e, id) =>
                    <button className={"search__address_list__label py-2"} key={"search-label-" + id}
                            onClick={() => {
                                const lng = e.x
                                const lat = e.y
                                props.updateCenterPosition({lat, lng})
                            }}>
                        <img src="icons/navigation/marker-address-list.png" alt="marker"
                             className={"search__address_list__label__icon"}/>
                        <div className={"search__address_list__label__text"}>{e.label}</div>
                    </button>
                )}
            </div>
        </div>
    )

    return (
        <div className={"p-3 bg-transparent"}>
            <div className="d-flex block-round search">
                <input type="text" placeholder="Search..."
                       className={"border-0 py-1 px-3 w-100 h-100 rounded-left bg-transparent"}
                       onInput={e => setSearchReq(e.target.value)}
                       onKeyPress={e => search(e, searchReq, setAddresses)}
                       onClick={() => setIsVisibleAddressList(true)}
                       value={searchReq}
                />
                {addressList}
            </div>
        </div>
    )
}

const mapSearchToProps = (state) => ({
    centerPosition: state.centerPosition
})

export default connect(mapSearchToProps, {updateCenterPosition})(MapSearch)

