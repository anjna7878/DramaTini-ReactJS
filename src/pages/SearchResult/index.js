import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import { usePlacesWidget } from "react-google-autocomplete";
import FormHelperText from '@material-ui/core/FormHelperText';
import { NotificationManager } from 'react-notifications';
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

import { _restServices } from "../../services/api";
import Layout from "../../components/global/Layout";
import NavBar from "../../components/global/NavBar";
import { MatButton } from "../../components/elements";
import BusinessList from "./BusinessList";
import TheaterList from "./TheaterList";
import Maps from "./Maps";
import { IoIosSend } from "react-icons/io";



function CardContents(props) {
    return (
        <>
            { (!!props.data?._source?.business_name) ?
                (<BusinessList data={props.data} />) : (
                    <TheaterList data={props.data} />
                )
            }
        </>
    );
}

function SingleCard(props) {
    return (
        <Col md='12'>
            <CardContents data={props.ad_data} />
        </Col>
    );
}

function TheaterAndBusinessList(props) {
    const results = props.data || [];
    const Items = results.map((item, i) => (
        <SingleCard key={i.toString()} ad_data={item} />
    ));
    return (<Row>{Items}</Row>);
}


function SearchResultPage({ history, props }) {
    const currentUser = useSelector(state => state.user);
    const [searchText, setSearchText] = React.useState('');
    const [isLoading, setLoading] = React.useState(false);
    const [searchError, setSearchError] = React.useState(false);
    const location = useLocation();


    const [search_location, setLocation] = React.useState({
        formatted_address: '',
        longitude: '',
        latitude: ''
    });
    const [mapCenter, setMapCenter] = React.useState({
        longitudeCC: '',
        latitudeCC: ''
    });

    const [searchData, serSearchResult] = useState({
        businessResult: [],
        theaterResult: []
    });

    React.useEffect(() => getPassedData(), [])

    const getPassedData = async () => {
        console.log('ON RESULT PAGE', location?.state?.search_location);
        if (location?.state?.search_location) {
            setSearchText(location?.state?.search_location?.formatted_address)
            fetchResult(location?.state?.search_location);
            setLocation({
                ...search_location,
                formatted_address: location?.state?.search_location?.formatted_address,
                longitude: location?.state?.search_location?.longitude,
                latitude: location?.state?.search_location?.latitude,
            })
        }
    };


    function fetchResult(val) {
        setLoading(true)
        setMapCenter({
            ...mapCenter,
            longitudeCC: search_location.longitude,
            latitudeCC: search_location.latitude,
        })
        history.replace({ pathname: '/search-result', state: search_location });

        _restServices.searchBusinessesAndTheaters(currentUser?.user, val).then(
            res => {
                setLoading(false)
                console.log(res);
                if (res['status'] === 1) {
                    serSearchResult({
                        ...searchData,
                        businessResult: res['data']['business'],
                        theaterResult: res['data']['theater'],
                    })

                } else {
                    NotificationManager.error('Something went wrong, try again');
                }
            }, error => {
                setLoading(false)
                NotificationManager.error('Something went wrong, try again later.');
            }

        );
    }

   
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

    function showResult() {
        if (searchText && search_location?.formatted_address) {
            fetchResult(search_location);
            setSearchError(false)

            console.log(search_location);
        } else {
            setSearchError(true)
        }
    }


    return (

        <Layout sectionId="SearchResultPageSection">
            <NavBar />
            <div id="banner-parent">
                <Container>
                    <div id="search-parent-box">
                        <Row>
                            <Col md='3' id='search-container'>
                                <div className="search-box">
                                    <h1>Find live, local Theater and Businesses to support</h1>
                                    <label htmlFor="searchText">Zip Code</label>
                                    <InputGroup >
                                        <FormControl ref={ref} value={searchText} onChange={e => setSearchText(e.target.value)} />
                                        <InputGroup.Append>
                                            <IconButton aria-label="send" className='send-icon' onClick={showResult}>
                                                <IoIosSend />
                                            </IconButton>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    {searchError &&
                                        <FormHelperText className='error-field'>Please select an address from dropdown</FormHelperText>
                                    }
                                    <p>Theaters & bars Locator is for United  States  only!!</p>
                                    <h6>Support local Theater and Businesses</h6>
                                    <MatButton
                                        type="button"
                                        disableElevation
                                        className='search-btn'
                                        btnText={"Search"}
                                        onClick={showResult}
                                    />
                                </div>
                            </Col>

                            <Col md='4' id="search-results">
                                <div >
                                    <Row className='main-row'>
                                        <Col>
                                            <div id="theaters-list">
                                                <h4>Theaters</h4>
                                                <hr />

                                                {isLoading && (
                                                    <Segment className='loading-section'>
                                                        <Dimmer active inverted>
                                                            <Loader indeterminate>Loading</Loader>
                                                        </Dimmer>
                                                    </Segment>
                                                )}

                                                {!isLoading && (
                                                    <>
                                                        {searchData?.theaterResult.length === 0 && (
                                                            <h5 className='no-result'>No theater found in this area</h5>
                                                        )}

                                                        {searchData?.theaterResult?.length > 0 && (
                                                            <TheaterAndBusinessList data={searchData?.theaterResult} />
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </Col>
                                        <Col>
                                            <div id="business-list">
                                                <h4>Martini's Bar</h4>
                                                <hr />

                                                {isLoading && (
                                                    <Segment className='loading-section'>
                                                        <Dimmer active inverted>
                                                            <Loader indeterminate>Loading</Loader>
                                                        </Dimmer>
                                                    </Segment>
                                                )}


                                                {!isLoading && (
                                                    <>
                                                        {searchData?.businessResult.length === 0 && (
                                                            <h5 className='no-result'>No Martini bar found in this area</h5>
                                                        )}

                                                        {searchData?.businessResult?.length > 0 && (
                                                            <TheaterAndBusinessList data={searchData?.businessResult} />
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col md='5' id='google-map'>
                                <Maps
                                    mapData={search_location}
                                    mapCenterPoints={mapCenter}
                                    theaterMarkers={searchData?.theaterResult}
                                    businessMarkers={searchData?.businessResult}
                                />

                            </Col>
                        </Row>

                    </div>
                </Container>
            </div>
        </Layout>
    );
}

export default SearchResultPage;







