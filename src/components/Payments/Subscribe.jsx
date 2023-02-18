import { Button, Heading } from "@chakra-ui/react";
import detectEthereumProvider from "@metamask/detect-provider";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import logo from "../../assets/images/logo.png";
import metamask from "../../assets/images/metamaskpayment.png";
import momo from "../../assets/images/momopayment.png";
import vnpay from "../../assets/images/vnpayment.png";
import { momopayment, vnpayment } from "../../redux/actions/user";
import { server } from "../../redux/store";

const Subscribe = ({ user }) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState("");
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
  });
  const [account, setAccount] = useState(null);
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        setWeb3Api({
          web3: new Web3(provider),
          provider,
        });
      } else {
        toast.error("Please, Install Metamask");
      }
    };
    loadProvider();
  }, []);
  const getAccount = async () => {
    const accounts = await web3Api.web3.eth.getAccounts();
    setAccount(accounts[0]);
  };
  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    web3Api.web3 && getAccount();
  }, [web3Api.web3]);
  const { loading, error, subscriptionId } = useSelector(
    (state) => state.subscription
  );
  const { error: courseError } = useSelector((state) => state.course);

  // const subscribeHandler = async () => {
  //   const {
  //     data: { key },
  //   } = await axios.get(`${server}/razorpaykey`);

  //   setKey(key);
  //   dispatch(buySubscription());
  // };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (courseError) {
      toast.error(courseError);
      dispatch({ type: "clearError" });
    }
    if (subscriptionId) {
      const openPopUp = () => {
        const options = {
          key,
          name: "CourseBundler",
          description: "Get access to all premium content",
          image: logo,
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentverification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: "",
          },
          notes: {
            address: "6 pack programmer at youtube",
          },
          theme: {
            color: "#FFC800",
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      };
      openPopUp();
    }
  }, [
    dispatch,
    error,
    courseError,
    user.name,
    user.email,
    key,
    subscriptionId,
  ]);

  return (
    <div
      style={{
        height: "90vh",
        padding: "16px",
      }}
    >
      <Heading
        children={`Welcome, Payment here !!`}
        my="8"
        textAlign={"center"}
      />
      {account && (
        <p>
          <strong>Your wallet:</strong> {account}
        </p>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "0 50px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            width: "200px",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={momo} alt="momo" />
          <div>
            <Button
              marginTop="20px"
              backgroundColor="#e06666"
              onClick={() => {
                dispatch(momopayment(user._id));
              }}
            >
              {" "}
              Buy now!{" "}
            </Button>
          </div>
        </div>
        <div
          style={{
            width: "200px",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={vnpay} alt="vnpay" />
          <div>
            <Button
              marginTop="20px"
              backgroundColor="#6fa8dc"
              onClick={() => {
                dispatch(vnpayment(user._id));
              }}
            >
              {" "}
              Buy now!{" "}
            </Button>
          </div>
        </div>
        <div
          style={{
            width: "200px",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={metamask} alt="metamask" />
          <div>
            <Button
              marginTop="20px"
              colorScheme={"yellow"}
              onClick={() => {
                web3Api.provider
                  .request({ method: "eth_requestAccounts" })
                  .then(getAccount)
                  .catch((error) => {
                    if (error.code === 4001) {
                      // EIP-1193 userRejectedRequest error
                      console.log("Please connect to MetaMask.");
                    } else {
                      console.error(error);
                    }
                  });
              }}
            >
              {" "}
              Buy now!{" "}
            </Button>
          </div>
        </div>
      </div>
      {/* <VStack
        boxShadow={"lg"}
        alignItems="stretch"
        borderRadius={"lg"}
        spacing="0"
      >
        <Box bg="yellow.400" p={"4"} css={{ borderRadius: "8px 8px 0 0" }}>
          <Text color={"black"} children={`Pro Pack - $299.00`} />
        </Box>
        <Box p="4">
          <VStack textAlign={"center"} px="8" mt={"4"} spacing="8">
            <Text children={`Join pro pack and get access to all content.`} />
            <Heading size="md" children={"$299 Only"} />
          </VStack>

          <Button
            my="8"
            w="full"
            colorScheme={"yellow"}
            // onClick={subscribeHandler}
            onClick={() => {
              web3Api.provider
                .request({ method: "eth_requestAccounts" })
                .then(getAccount)
                .catch((error) => {
                  if (error.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    console.log("Please connect to MetaMask.");
                  } else {
                    console.error(error);
                  }
                });
            }}
            isLoading={loading}
          >
            Buy Now
          </Button>
          <Button
            my="8"
            w="full"
            colorScheme={"yellow"}
            // onClick={subscribeHandler}
            onClick={() => {
              web3Api.provider
                .request({ method: "eth_requestAccounts" })
                .then(getAccount)
                .catch((error) => {
                  if (error.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    console.log("Please connect to MetaMask.");
                  } else {
                    console.error(error);
                  }
                });
            }}
            isLoading={loading}
          >
            Buy Now
          </Button>
        </Box>

        <Box bg="blackAlpha.600" p="4" css={{ borderRadius: "0 0 8px 8px" }}>
          <Heading
            color={"white"}
            textTransform="uppercase"
            size="sm"
            children={"100% refund at cancellation"}
          />

          <Text
            fontSize={"xs"}
            color="white"
            children={"*Terms & Conditions Apply"}
          />
        </Box>
      </VStack> */}
    </div>
  );
};

export default Subscribe;
