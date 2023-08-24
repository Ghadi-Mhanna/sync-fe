import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Button, Container, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {deleteNews} from "../config/api";
import {fetchAllNews} from "../redux/newsSlice";
import moment from "moment";

function News() {
  const dispatch = useDispatch();
  const {news} = useSelector((state) => state.news);

  const handleDelete = async (uuid) => {
    await deleteNews(uuid).then((res) => {
      if (res.status === 200) {
        dispatch(fetchAllNews());
      } else {
        console.log("fail");
      }
    });
  };
  useEffect(() => {
    dispatch(fetchAllNews());
  }, [dispatch]);

  return (
    <Container className='mt-5'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h2 className='mb-0'>News Page</h2>
        <Link to='/create-news' className='btn btn-primary'>
          Add New News
        </Link>
      </div>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Date</th>
            <th>Added By</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {news.map((news) => (
            <tr key={news.uuid}>
              <td>
                <Link to={`/news/${news.uuid}`}>{news.title}</Link>
              </td>
              <td>{news.content}</td>
              <td>{moment(news.date).format("DD-MM-YYYY")}</td>
              <td>
                {news?.user?.first_name} {news?.user?.last_name}
              </td>
              <td className='d-flex justify-content-center'>
                <Button
                  variant='danger'
                  onClick={() => handleDelete(news.uuid)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default News;
