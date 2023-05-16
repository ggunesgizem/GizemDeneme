
//token ile gelen userId'yi storage'a id_token olarak kaydet
export const saveUserId = async userId => {
  try {
    await AsyncStorage.setItem("id_token", userId);
  } catch (error) {
      console.log(error.message);
  }
};

//storage'a kaydedilen id_token'ı al ve geriye döndür
export const getUserId = async () => {
  let userId = "";
  try {
    userId = (await AsyncStorage.getItem("id_token")) || "none";
  } catch (error) {
    console.log(error.message);
  }
  return userId;
};