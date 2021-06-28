import React from "react";
import { Alert } from "react-native"
import Loading from "./Loading";
import * as Location from 'expo-location';

export default class extends React.Component {
  //함수설정
  getLocation = async () => {
    try {
      //throw Error();
      //일부러 에러 던지기
      await Location.requestPermissionsAsync();
      const location = await Location.getCurrentPositionAsync();
      console.log(location);
    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
    }
  };
  componentDidMount() {
    this.getLocation();

  }
  render() {
    return <Loading />;
  }
}
