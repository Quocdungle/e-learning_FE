import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Image,
  TableContainer,
  useDisclosure,
} from "@chakra-ui/react";
import { Table as TableAnt } from "antd";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import cursor from "../../../assets/images/cursor.png";
import {
  addLecture,
  deleteCourse,
  deleteLecture,
} from "../../../redux/actions/admin";
import {
  getAllCourses,
  getCourseLectures,
} from "../../../redux/actions/course";
import Sidebar from "../Sidebar";
import CourseModal from "./CourseModal";

const AdminCourses = () => {
  const { courses, lectures } = useSelector((state) => state.course);

  const { loading, error, message } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [courseId, setCourseId] = useState("");
  const [courseTitle, setCourseTitle] = useState("");

  const coureDetailsHandler = (courseId, title) => {
    dispatch(getCourseLectures(courseId));
    onOpen();
    setCourseId(courseId);
    setCourseTitle(title);
  };
  const deleteButtonHandler = (courseId) => {
    dispatch(deleteCourse(courseId));
  };

  const deleteLectureButtonHandler = async (courseId, lectureId) => {
    await dispatch(deleteLecture(courseId, lectureId));
    dispatch(getCourseLectures(courseId));
  };

  const addLectureHandler = async (e, courseId, title, description, video) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    await dispatch(addLecture(courseId, myForm));
    dispatch(getCourseLectures(courseId));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }

    dispatch(getAllCourses());
  }, [dispatch, error, message, onClose]);
  const columns = [
    {
      title: "Id",
      dataIndex: "Id",
      render: (text) => <div>{`#${text}`}</div>,
    },
    {
      title: "Poster",
      dataIndex: "Poster",
      render: (text) => (
        <div
          style={{
            width: "60px",
            height: "60px",
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src={text}
          />
        </div>
      ),
    },
    {
      title: "Title",
      dataIndex: "Title",
    },
    {
      title: "Category",
      dataIndex: "Category",
      render: (text) => (
        <div
          style={{
            textTransform: "uppercase",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Creator",
      dataIndex: "Creator",
    },
    {
      title: "Views",
      dataIndex: "Views",
    },
    {
      title: "Lectures",
      dataIndex: "Lectures",
    },
    {
      title: (
        <div
          style={{
            textAlign: "center",
          }}
        >
          Action
        </div>
      ),
      render: (text, data) => (
        <HStack justifyContent={"flex-end"}>
          <Button
            onClick={() => coureDetailsHandler(data.Id, data.Title)}
            variant={"outline"}
            color="purple.500"
            isLoading={loading}
          >
            View Lectures
          </Button>

          <Button
            onClick={() => deleteButtonHandler(data.Id)}
            color={"purple.600"}
            isLoading={loading}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      ),
    },
  ];
  let dataColumns = [];
  // eslint-disable-next-line array-callback-return
  courses.map((item) => {
    dataColumns.push({
      key: item._id,
      Id: item._id,
      Poster: item.poster.url,
      Title: item.title,
      Category: item.category,
      Creator: item.createdBy,
      Views: item.views,
      Lectures: item.numOfVideos,
    });
  });
  return (
    <Grid
      css={{
        cursor: `url(${cursor}), default`,
      }}
      minH={"100vh"}
      templateColumns={["1fr", "5fr 1fr"]}
    >
      <Box p={["0", "8"]} overflowX="auto">
        <Heading
          textTransform={"uppercase"}
          children="All Courses"
          my="16"
          textAlign={["center", "left"]}
        />

        <TableContainer w={["100vw", "full"]}>
          {/* <Table variant={"simple"} size="lg">
            <TableCaption>All available courses in the database</TableCaption>

            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {courses.map((item) => (
                <Row
                  coureDetailsHandler={coureDetailsHandler}
                  deleteButtonHandler={deleteButtonHandler}
                  key={item._id}
                  item={item}
                  loading={loading}
                />
              ))}
            </Tbody>
          </Table> */}
          <TableAnt
            scroll={{
              x: true,
              // y: 500,
            }}
            columns={columns}
            dataSource={dataColumns}
            pagination={{
              showSizeChanger: false,
              defaultPageSize: 20,
              pageSize: 20,
            }}
          />
        </TableContainer>

        <CourseModal
          isOpen={isOpen}
          onClose={onClose}
          id={courseId}
          courseTitle={courseTitle}
          deleteButtonHandler={deleteLectureButtonHandler}
          addLectureHandler={addLectureHandler}
          lectures={lectures}
          loading={loading}
        />
      </Box>

      <Sidebar />
    </Grid>
  );
};

export default AdminCourses;
