import { Button, Container, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addToPlaylist } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import './courses.scss';
import vg from '../../assets/images/bg.png';

const DetailCourses = () => {
  const searchParams = useParams();
  const idCourse = searchParams.idCourse;
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();

  const addToPlaylistHandler = async (couseId) => {
    await dispatch(addToPlaylist(couseId));
    dispatch(loadUser());
  };

  const categories = [
    'Web development',
    'Artificial Intellegence',
    'Data Structure & Algorithm',
    'App Development',
    'Data Science',
    'Game Development',
  ];

  return (
    <Container minH={'95vh'} maxW='container.lg' paddingY={'8'}>
      <div className='wrapper'>
        <div className='imageDetail'>
          <img src={vg} alt='' />
        </div>
        <div className='informationDetail'>
          <p className='title'>Dung an lz</p>
          <span className='id'>Course ID: 123123</span>
          <hr />
          <div className='ratings'>star</div>
          <hr />
          <Stack
            direction={['column', 'row']}
            alignItems='center'
            marginTop={'20px'}
            marginBottom={'20px'}
          >
            <Link to={`/course/`}>
              <Button colorScheme={'yellow'}>Watch Now</Button>
            </Link>
            <Button
              // isLoading={loading}
              variant={'ghost'}
              colorScheme={'yellow'}
              // onClick={() => addToPlaylistHandler(id)}
            >
              Add to playlist
            </Button>
          </Stack>
          <div className='description'>
            <p>Description: </p>
            <h1>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore
              necessitatibus exercitationem commodi dignissimos officiis, et
              incidunt quas architecto alias quam beatae consectetur tenetur,
              dolorum quod nesciunt. Rerum animi consectetur dolorum unde
              expedita reiciendis laboriosam iste pariatur vero libero. Omnis,
              saepe!
            </h1>
          </div>
        </div>
      </div>

      <hr />

      <div className='wrapper2'>
        <div className='comments'>
          {/* Input bỏ vào đây nhé thằng loz */}

          <div className='commentBox'>
            <div className='avatar'>
              <img src={vg} alt='' />
            </div>
            <div className='inforUser'>
              <p className='userName'>Dungloz</p>
              <p className='comment'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Assumenda, nisi?
              </p>
            </div>
          </div>
          <div className='commentBox'>
            <div className='avatar'>
              <img src={vg} alt='' />
            </div>
            <div className='inforUser'>
              <p className='userName'>Dungloz</p>
              <p className='comment'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Assumenda, nisi?
              </p>
            </div>
          </div>
          <div className='commentBox'>
            <div className='avatar'>
              <img src={vg} alt='' />
            </div>
            <div className='inforUser'>
              <p className='userName'>Dungloz</p>
              <p className='comment'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Assumenda, nisi?
              </p>
            </div>
          </div>
        </div>
        <div className='comments'>
          <div className='commentBox'>
            <div className='avatar'>
              <img src={vg} alt='' />
            </div>
            <div className='inforUser'>
              <p className='userName'>Dungloz</p>
              <p className='comment'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Assumenda, nisi?
              </p>
            </div>
          </div>
          <div className='commentBox'>
            <div className='avatar'>
              <img src={vg} alt='' />
            </div>
            <div className='inforUser'>
              <p className='userName'>Dungloz</p>
              <p className='comment'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Assumenda, nisi?
              </p>
            </div>
          </div>
          <div className='commentBox'>
            <div className='avatar'>
              <img src={vg} alt='' />
            </div>
            <div className='inforUser'>
              <p className='userName'>Dungloz</p>
              <p className='comment'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Assumenda, nisi?
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DetailCourses;
