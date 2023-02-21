import { Button, Container, Stack } from "@chakra-ui/react";
import { Input, Rate, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiSendPlaneFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  addCommentCourse,
  addRatingCourse,
  getAllCourses,
} from "../../redux/actions/course";
import { addToPlaylist } from "../../redux/actions/profile";
import { loadUser } from "../../redux/actions/user";
import "./courses.scss";
const { TabPane } = Tabs;

const { TextArea } = Input;
const DetailCourses = ({ isAuthenticated, user }) => {
  const searchParams = useParams();
  const idCourse = searchParams.idCourse;
  const [detailCourse, setDetailCourse] = useState({});
  const [totalRate, setTotalRate] = useState(0);
  const [rateList, setRateList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [tab, setTab] = useState(1);

  const [commentInput, setCommentInput] = useState("");
  const [valueRate, setValueRate] = useState(0);

  const dispatch = useDispatch();
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const addToPlaylistHandler = async (couseId) => {
    await dispatch(addToPlaylist(couseId));
    dispatch(loadUser());
  };
  const { courses, error, message } = useSelector((state) => state.course);
  // const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllCourses());
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);
  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    courses.map((item) => {
      if (item._id === idCourse) {
        let total = 0;
        if (item.ratings?.length > 0) {
          let count = 0;
          // eslint-disable-next-line array-callback-return
          item.ratings?.map((itemrate) => {
            if (itemrate.point) {
              count += 1;
              total += itemrate.point;
            }
          });
          if (count !== 0) {
            const total_rate = total / count;
            setTotalRate(total_rate);
          }
        }

        setDetailCourse(item);
        const comment_list = [...item.comments].reverse();
        const rating_list = [...item.ratings].reverse();
        setCommentList(comment_list);
        setRateList(rating_list);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses]);
  useEffect(() => {
    const fetchApi = async () => {
      await dispatch(
        addRatingCourse({
          rating: {
            courseId: idCourse,
            point: valueRate,
          },
          userName: user.name,
          userAvt: user.avatar.url,
        })
      );
      dispatch(getAllCourses());
      setValueRate(0);
    };
    if (valueRate !== 0) {
      fetchApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueRate]);
  const onTabsChange = (tab) => {
    setTab(tab);
  };
  const handleChangeRate = (star) => {
    setValueRate(star);
  };
  const onSubmitComment = async () => {
    if (commentInput !== "") {
      await dispatch(
        addCommentCourse({
          comment: {
            courseId: idCourse,
            title: commentInput,
            userName: user.name,
            userAvt: user.avatar.url,
          },
        })
      );
      dispatch(getAllCourses());
      setCommentInput("");
    }
  };
  return (
    <Container minH={"95vh"} maxW="container.lg" paddingY={"8"}>
      <div className="wrapper">
        <div className="imageDetail">
          <img src={detailCourse.poster?.url} alt="" />
        </div>
        <div className="informationDetail">
          <p className="title">{detailCourse.title}</p>
          <span className="id">Course ID: {idCourse}</span>
          <hr />
          <div className="ratings">
            <Rate allowHalf disabled value={totalRate} />
          </div>
          <hr />
          <Stack
            direction={["column", "row"]}
            alignItems="center"
            marginTop={"20px"}
            marginBottom={"20px"}
          >
            <Link to={`/course/${idCourse}`}>
              <Button colorScheme={"yellow"}>Watch Now</Button>
            </Link>
            <Button
              // isLoading={loading}
              variant={"ghost"}
              colorScheme={"yellow"}
              onClick={() => addToPlaylistHandler(idCourse)}
            >
              Add to playlist
            </Button>
          </Stack>
          <div className="description">
            <p>Created By: {detailCourse.createdBy} </p>
          </div>
          <div className="description">
            <p>Description: </p>
            <h1>{detailCourse.description}</h1>
          </div>
        </div>
      </div>
      <Tabs
        defaultActiveKey={tab}
        onChange={onTabsChange}
        style={{ marginTop: "20px" }}
      >
        <TabPane tab="Comments" key="1">
          <div className="comments">
            {isAuthenticated && (
              <div className="commentBox">
                <div className="avatar">
                  <img src={user.avatar.url} alt="" />
                </div>
                <div className="inforUser">
                  <TextArea
                    placeholder="Type comment..."
                    rows={2}
                    style={{
                      width: "100%",
                    }}
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                  />
                </div>
                <div className="icon" onClick={onSubmitComment}>
                  <RiSendPlaneFill color="blue" size={30} />
                </div>
              </div>
            )}
            {commentList.map((item, i) => (
              <div className="commentBox" key={i}>
                <div className="avatar">
                  <img src={item.userAvt} alt="" />
                </div>
                <div className="inforUser">
                  <p className="userName">{item.userName}</p>
                  <p className="comment">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </TabPane>
        <TabPane tab="Ratings" key="2">
          <div className="comments">
            {isAuthenticated &&
              user.subscription &&
              user.subscription?.status === "active" && (
                <div className="commentBox">
                  <div className="avatar">
                    <img src={user.avatar.url} alt="" />
                  </div>
                  <div className="inforUser">
                    <Rate
                      tooltips={desc}
                      onChange={handleChangeRate}
                      value={valueRate}
                    />
                  </div>
                </div>
              )}
            {rateList.map((item, i) => (
              <div className="commentBox" key={i}>
                <div className="avatar">
                  <img src={item.userAvt} alt="" />
                </div>
                <div className="inforUser">
                  <p className="userName">{item.userName}</p>

                  <Rate disabled value={item.point} />
                </div>
              </div>
            ))}
          </div>
        </TabPane>
      </Tabs>
    </Container>
  );
};

export default DetailCourses;
