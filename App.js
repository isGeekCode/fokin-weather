import React from "react";
import { Alert } from "react-native"
import Loading from "./Loading";
import * as Location from 'expo-location';
import axios from "axios";

const API_KEY = "9c9620e4f11b348c297cefb94c9667c2";

export default class extends React.Component {
  state = {
    isLoading: true
  };
  // 반드시 ""이것도 '' 이것도 아니라 숫자 1왼쪽에 있는 ₩키를 이용할것//

  getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    //마지막에 &units=metric을 추가하면 F화씨에서  C 형식으로 불러올수있음
    console.log(data);
  };

  //함수설정
  getLocation = async () => {
    try {
      //throw Error();//
      //일부러 에러 던지기//
      await Location.requestPermissionsAsync();
      //      로그값 가져오기
      //      const location = await Location.getCurrentPositionAsync();
      //      console.log(location);
      //      coords 라는 object 중 latitude, longitude 가져오기//
      const {
        coords: { latitude, longitude }
      } = await Location.getCurrentPositionAsync();

      //      console.log(coords.latitude, coords.longitude)//
      //      SEND to API and Get weather//
      this.getWeather(latitude, longitude);
      this.setState({ isLoading: false });
    } catch (error) {
      //실패하는 경우 //
      Alert.alert("Can't find you.", "So sad");
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : null;
  }
}
