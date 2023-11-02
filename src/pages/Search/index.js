import React from "react";
// import { useSelector, } from "react-redux";
import { Container, InputGroup, FormControl } from "react-bootstrap";
import IconButton from '@material-ui/core/IconButton';
import { usePlacesWidget } from "react-google-autocomplete";
import FormHelperText from '@material-ui/core/FormHelperText';


import Layout from "../../components/global/Layout";
import NavBar from "../../components/global/NavBar";

import { IoIosSend } from "react-icons/io";




function SearchPage({ history, props }) {
    // const currentUser = useSelector(state => state.user);
    const [searchText, setSearchText] = React.useState('');
    const [searchError, setSearchError] = React.useState(false);


    const [search_location, setLocation] = React.useState({
        formatted_address: '',
        longitude: '',
        latitude: ''
    });




    const { ref, autocompleteRef } = usePlacesWidget({
        apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        onPlaceSelected: (place) => {
            console.log(place);
            setSearchError(false);
            setSearchText(place.formatted_address);
            setLocation({
                ...search_location,
                formatted_address: place.formatted_address,
                longitude: place.geometry.location.lng(),
                latitude: place.geometry.location.lat()
            });
        },
        options: {
            types: ["(regions)"],
            componentRestrictions: { country: "us" },
        },
    });


    function goToResult() {

        if (search_location?.formatted_address) {
            setSearchError(false);
            console.log('ON SEARCH PAGE', search_location);

            history.push({ pathname: '/search-result', state: { search_location } });
        } else {
            setSearchError(true);
        }
    }


    return (


        <Layout sectionId="SearchPageSection">
            <NavBar />
            <div id="banner-parent">
                <Container>
                    <div id="search-parent-box">
                        <div className="search-box">
                            <h1>Find live, local Theater and Businesses to support</h1>
                            <label htmlFor="searchText">Zip Code</label>
                            <InputGroup >
                                <FormControl
                                    autoComplete="new-password"
                                    ref={ref}
                                    // value={search_location?.formatted_address} 
                                    value={searchText}
                                    onChange={e => setSearchText(e.target.value)}
                                />
                                <InputGroup.Append>
                                    <IconButton aria-label="send" className='send-icon' onClick={goToResult} >
                                        <IoIosSend />
                                    </IconButton>
                                </InputGroup.Append>

                            </InputGroup>
                            {searchError &&
                                <FormHelperText className='error-field'>Please select an address from dropdown</FormHelperText>
                            }
                            <p>Theaters & bars Locator is for United  States  only!!</p>
                            {/* <h6>Support local Theater and Businesses</h6>
                            <MatButton
                                type="submit"
                                disableElevation
                                className='search-btn'
                                onClick={goToResult}
                                btnText={"Search"}
                            /> */}
                        </div>
                    </div>
                </Container>
            </div>
        </Layout>
    );
}

export default SearchPage;







