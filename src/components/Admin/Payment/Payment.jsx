import { SearchOutlined } from "@ant-design/icons";
import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Input,
  Skeleton,
  Stack,
  TableContainer,
} from "@chakra-ui/react";
import { Table as TableAnt } from "antd";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import cursor from "../../../assets/images/cursor.png";
import {
  activatePayment,
  deactivatePayment,
  getAllUsers,
} from "../../../redux/actions/admin";
import Sidebar from "../Sidebar";

const Payment = () => {
  const { users, loading, error, message } = useSelector(
    (state) => state.admin
  );

  const [loadingApi, setLoadingApi] = useState(false);

  const dispatch = useDispatch();

  const inputSearch = useRef();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }

    setLoadingApi(true);
    dispatch(getAllUsers());
    setTimeout(() => {
      setLoadingApi(false);
    }, 1000);
  }, [dispatch, error, message]);
  const handleDeActivePayment = async (id) => {
    await dispatch(deactivatePayment(id));
    setLoadingApi(true);
    await dispatch(getAllUsers());
    setTimeout(() => {
      setLoadingApi(false);
    }, 1000);
  };
  const handleActivePayment = async (id) => {
    await dispatch(activatePayment(id));
    setLoadingApi(true);
    await dispatch(getAllUsers());
    setTimeout(() => {
      setLoadingApi(false);
    }, 1000);
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "Id",
      render: (text) => <div>{`#${text}`}</div>,
    },
    {
      title: "Name",
      dataIndex: "Name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <div className="d-flex">
            <Input
              ref={inputSearch}
              placeholder="Nhập..."
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
            ></Input>
          </div>
        );
      },
      filterIcon: () => {
        return (
          <div
            style={{
              width: "100%",
              height: "100%",
            }}
            onClick={() => {
              setTimeout(() => inputSearch.current?.select(), 100);
            }}
          >
            <SearchOutlined />
          </div>
        );
      },
      onFilter: (value, record) => {
        return record.Name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Email",
      dataIndex: "Email",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <div className="d-flex">
            <Input
              ref={inputSearch}
              placeholder="Nhập..."
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
            ></Input>
          </div>
        );
      },
      filterIcon: () => {
        return (
          <div
            style={{
              width: "100%",
              height: "100%",
            }}
            onClick={() => {
              setTimeout(() => inputSearch.current?.select(), 100);
            }}
          >
            <SearchOutlined />
          </div>
        );
      },
      onFilter: (value, record) => {
        return record.Email.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Role",
      dataIndex: "Role",
    },
    {
      title: "Subscription",
      render: (text, data) => (
        <div>
          {data.Subscription && data.SubscriptionStatus === "active"
            ? "Active"
            : "Not Active"}
        </div>
      ),
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
          {data.Subscription && data.SubscriptionStatus === "active" ? (
            <Button
              onClick={() => handleDeActivePayment(data.Id)}
              variant={"outline"}
              color="red.500"
              width={100}
              isLoading={loading}
            >
              Deactivate
            </Button>
          ) : (
            <Button
              onClick={() => handleActivePayment(data.Id)}
              variant={"outline"}
              color="green.500"
              width={100}
              isLoading={loading}
            >
              Activate
            </Button>
          )}
        </HStack>
      ),
    },
  ];
  let dataColumns = [];
  users &&
    // eslint-disable-next-line array-callback-return
    users.map((item) => {
      dataColumns.push({
        key: item._id,
        Id: item._id,
        Name: item.name,
        Email: item.email,
        Role: item.role,
        Subscription: item.subscription,
        SubscriptionStatus: item.subscription?.status,
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
      <Box p={["0", "16"]} overflowX="auto">
        <Heading
          textTransform={"uppercase"}
          children="All Users"
          my="16"
          textAlign={["center", "left"]}
        />
        {loadingApi && (
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        )}
        {!loadingApi && (
          <TableContainer w={["100vw", "full"]}>
            <TableAnt
              scroll={{
                x: true,
                y: 500,
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
        )}
      </Box>

      <Sidebar />
    </Grid>
  );
};

export default Payment;
