import React from 'react'
import {Button} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons'
import '../../assets/css/search/Search.css'

const Search = (props) => (
    <div className={"px-3 py-4 bg-transparent"}>
        <div className="d-flex block-round search">
            <input type="text" placeholder="Search..."
                   className={"border-0 py-1 px-3 w-100 rounded-left bg-transparent"}/>
            <div className={"my-1 bg-secondary stick"}/>
            <div className="input-group-append">
                <Button className={"border-0 bg-transparent rounded-right shadow-none"}>
                    <FontAwesomeIcon icon={faLongArrowAltRight} className={"text-dark"}/>
                </Button>
            </div>
        </div>
    </div>
)

export default Search