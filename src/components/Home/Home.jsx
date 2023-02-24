import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { CgGoogle, CgYoutube } from 'react-icons/cg';
import { DiAws } from 'react-icons/di';
import { SiCoursera, SiUdemy } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import vg from '../../assets/images/bg.png';
import slider1 from '../../assets/images/slide1.jpg';
import slider2 from '../../assets/images/slide2.jpg';
import slider3 from '../../assets/images/slide3.jpg';
import introVideo from '../../assets/videos/intro.mp4';
import './home.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getAllCourses,
  getRecommendationCourse,
} from '../../redux/actions/course';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const allCourses = useSelector((state) => state?.course?.courses);
  const courseRecommend = useSelector(
    (state) => state?.course?.courseRecommend?.predicted_vehicle
  );

  const [courses, setCourses] = useState(null);

  const userId = user?.user?._id;

  useEffect(() => {
    dispatch(getAllCourses());
    dispatch(getRecommendationCourse(userId));
    console.log('vao day');
  }, [userId, dispatch, courseRecommend]);

  // useEffect(() => {
  //   if (userId) {
  //     setCourses(courseRecommend);
  //     console.log('vao day 2');
  //   }
  // }, [courseRecommend, userId]);

  return (
    <section className='home'>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>
          <img src={slider1} alt='' className='image__slide' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider2} alt='' className='image__slide' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider3} alt='' className='image__slide' />
        </SwiperSlide>
      </Swiper>
      <div className='container'>
        <Stack
          direction={['column', 'row']}
          height='100%'
          justifyContent={['center', 'space-between']}
          alignItems='center'
          spacing={['16', '56']}
        >
          <VStack
            width={'full'}
            alignItems={['center', 'flex-end']}
            spacing='8'
          >
            <Heading children='LEARN FROM THE EXPERTS' size={'2xl'} />
            <Text
              fontSize={'2xl'}
              fontFamily='cursive'
              textAlign={['center', 'left']}
              children='Find Valuable Content At Reasonable Price'
            />
            <Link to='/courses'>
              <Button size={'lg'} colorScheme='yellow'>
                Explore Now
              </Button>
            </Link>
          </VStack>

          <Image
            className='vector-graphics'
            boxSize={'md'}
            src={vg}
            objectFit='contain'
          />
        </Stack>
      </div>

      <Box padding={'8'} bg='blackAlpha.800'>
        <Heading
          textAlign={'center'}
          fontFamily='body'
          color={'yellow.400'}
          children='OUR BRANDS'
        />
        <HStack
          className='brandsBanner'
          justifyContent={'space-evenly'}
          marginTop='4'
        >
          <CgGoogle />
          <CgYoutube />
          <SiCoursera />
          <SiUdemy />
          <DiAws />
        </HStack>
      </Box>

      <div className='recommend'>
        <h1>Recommend For You </h1>
        <hr />
        <div className='slider'>
          {courseRecommend?.map((course) => (
            <div
              className='slide'
              onClick={() => navigate(`/detailcourse/${course._id}`)}
            >
              <div className='imgBox'>
                <img src={course?.poster?.url} alt='' />
              </div>
              <div className='summary-course'>
                <p className='title'>{course?.title}</p>
                <p className='author'>{course?.createdBy}</p>
              </div>
            </div>
          ))}
        </div>
        <hr />
      </div>

      <div className='container2'>
        <video
          controls
          controlsList='nodownload nofullscreen noremoteplayback'
          disablePictureInPicture
          disableRemotePlayback
          autoPlay
          src={introVideo}
        ></video>
      </div>
    </section>
  );
};

export default Home;
