import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
// import {fetchAllNews} from "./allNewsSlice"; // Import your fetchAllNews action
import {Container, Row, Col, Card} from "react-bootstrap";
import {fetchAllNews} from "../redux/newsSlice";
import moment from "moment";

function Home() {
  const dispatch = useDispatch();
  const {news} = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchAllNews());
  }, [dispatch]);
  console.log("news", news);
  return (
    <Container className='mt-5'>
      <h2 className='text-center mb-4'>All News</h2>
      <Row xs={1} sm={2} md={3} className='g-4'>
        {news.map((news) => (
          <Col key={news.uuid}>
            <Card>
              <Card.Body>
                <Card.Img
                  variant='top'
                  src={news?.images[0]?.path}
                  alt='News Image'
                />

                <Card.Title>{news.title}</Card.Title>
                <Card.Text>{news.content}</Card.Text>
                <Card.Text className='text-muted'>
                  Date: {moment(news.date).format("DD-MM-YYYY")} | Added by:{" "}
                  {news?.user?.first_name} {news?.user?.last_name}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
