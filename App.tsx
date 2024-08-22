import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, Modal, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false, // 이 부분을 false로 변경
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleCenterButtonPress = () => {
    if (selectedImage) {
      setIsLoading(true);
      // 여기에 이미지 처리 로직을 추가할 수 있습니다.
      // 예: 서버에 이미지 업로드 등
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // 2초 후에 로딩 모달을 닫습니다. 실제 로직에 맞게 조정하세요.
    } else {
      pickImage();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          {/* 여기에 로고 이미지를 넣을 수 있습니다 */}
          <View style={styles.logoPlaceholder} />
        </View>
      </View>

      <View style={styles.container}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        ) : (
          <>
            <Text style={styles.placeholderText}>이미지를 선택해주세요</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Icon name="camera" size={30} color="#fff" />
            </TouchableOpacity>
          </>
        )}
      </View>
      <Modal transparent={true} animationType="fade" visible={isLoading} onRequestClose={() => setIsLoading(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        </View>
      </Modal>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={pickImage}>
          <Icon name="image" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.centerButton} onPress={handleCenterButtonPress}>
          <View style={styles.centerButtonInner} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => setSelectedImage(null)}>
          <Icon name="refresh" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    marginLeft: 10,
    marginTop: 15,
  },
  logoPlaceholder: {
    width: 67,
    height: 30,
    backgroundColor: '#fff',
    // borderRadius: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  uploadButton: {
    marginTop: 20,
    backgroundColor: '#888',
    padding: 10,
    borderRadius: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerButton: {
    padding: 10,
  },
  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  placeholderText: {
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  activityIndicatorWrapper: {
    backgroundColor: 'white',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
