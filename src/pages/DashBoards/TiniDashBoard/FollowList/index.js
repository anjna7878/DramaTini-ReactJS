
import React, { useState } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Row, Col } from "react-bootstrap";
import { Avatar } from '@material-ui/core';
import { useSelector } from "react-redux";
import Moment from 'react-moment';
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import { NotificationManager } from 'react-notifications';

import { MatButton } from "../../../../components/elements";
import { _restServices } from "../../../../services/api";


function FollowListPage({ history }) {
  const currentUser = useSelector(state => state.user);
  const [isLoading, setLoading] = useState(false);


  const [followListData, setFollowListData] = useState({
    business: [],
    theater: []
  });


  React.useEffect(() => getFollowList(), [])

  const getFollowList = async () => {
    setLoading(true)
    const res = await _restServices.fetchFollowList(currentUser?.user);
    console.log(res);
    setLoading(false)
    if (res?.status === 1) {
      setFollowListData({
        ...followListData,
        business: res['data']['business'],
        theater: res['data']['theater']
      })
    }
  };


  function unsubscribe(event, val, type) {
    setLoading(true);
    _restServices.doUnFollowTheaterOrBusiness(currentUser?.user, type, val?._id).then(
      res => {
        console.log(res);
        setLoading(false);
        if (res['status'] === 1) {
          NotificationManager.success('Success');
          // getFollowList();
          setFollowListData({
            ...followListData,
            business: res['data']['business'],
            theater: res['data']['theater']
          })
        } else if (res['status'] === 0) {
          Object.keys(res['error']).forEach(function (key) {
            NotificationManager.error(res['error'][key]['message']);
          })
        } else {
          NotificationManager.error('Something went wrong, try again later.');
        }
      },
      error => {
        setLoading(false);
        NotificationManager.error('Something went wrong, try again later.');
      }
    );
  }

  return (
    <>
      <div id="tini-follow-list-section-parent">
        <h6 className='__text__'><span>Follow List</span></h6>
        <div id="follow-listing">
          {isLoading && (
            <Segment className='loading-section'>
              <Dimmer active inverted>
                <Loader indeterminate>Loading</Loader>
              </Dimmer>
            </Segment>
          )}

          {(!isLoading && (followListData?.business?.length === 0 && followListData?.theater?.length === 0)) && (
            <h6 className='no-data'>You followed none</h6>
          )}


          {!isLoading && (followListData?.business?.length > 0 || followListData?.theater?.length > 0) && (
            <>
              <Row>
                <Col md='2' className="logo">
                  <h6>Logo</h6>
                </Col>
                <Col md='3' className='name m-auto'>
                  <h6>Name</h6>
                </Col>
                <Col md='2' className='type m-auto'>
                  <h6>Type</h6>
                </Col>
                <Col md='3' className='date m-auto'>
                  <h6>Follow Date</h6>
                </Col>
                <Col md='2' className='actions-btn m-auto text-center'>
                  <h6>Action</h6>
                </Col>
              </Row>

              {followListData?.business?.length > 0 && followListData?.business?.map((e, key) => {
                return (
                  <Card className='single-item' key={key}>
                    <CardContent>
                      <Row>
                        <Col md='2' className="logo">
                          <div >
                            <Avatar alt="img" src={`${process.env.REACT_APP_PROFILE_PIC_PRE}/${e?.image}`} />
                          </div>
                        </Col>
                        <Col md='3' className='name m-auto'>
                          <h6>{e?.business_name}</h6>
                        </Col>
                        <Col md='2' className='type m-auto'>
                          <h6>{'business'}</h6>
                        </Col>
                        <Col md='3' className='date m-auto'>
                          <h6><Moment format="DD-MM-YYYY">{e?._source?.follow_by_time}</Moment></h6>
                        </Col>
                        <Col md='2' className='actions-btn m-auto'>
                          <MatButton
                            type="button"
                            disableElevation
                            className='edit_btn'
                            btnText={'Unfollow'}
                            onClick={(ev) => { unsubscribe(ev, e, 'business') }}
                          />
                        </Col>
                      </Row>
                    </CardContent>
                  </Card>
                )
              })}

              {followListData?.theater?.length > 0 && followListData?.theater?.map((e, key) => {
                return (
                  <Card className='single-item' key={key}>
                    <CardContent>
                      <Row>
                        <Col md='2' className="logo">
                          <div >
                            <Avatar alt="img" src={`${process.env.REACT_APP_PROFILE_PIC_PRE}/${e?.image}`} />
                          </div>
                        </Col>
                        <Col md='3' className='name m-auto'>
                          <h6>{e?.theater_name}</h6>
                        </Col>
                        <Col md='2' className='type m-auto'>
                          <h6>{'theater'}</h6>
                        </Col>
                        <Col md='3' className='date m-auto'>
                          <h6><Moment format="DD-MM-YYYY">{e?._source?.follow_by_time}</Moment></h6>
                        </Col>
                        <Col md='2' className='actions-btn m-auto'>
                          <MatButton
                            type="button"
                            disableElevation
                            className='edit_btn'
                            btnText={'Unfollow'}
                            onClick={(ev) => { unsubscribe(ev, e, 'theater') }}
                          />
                        </Col>
                      </Row>
                    </CardContent>
                  </Card>
                )
              })}
            </>
          )}
        </div>
      </div>
    </>
  )
}
export default FollowListPage;