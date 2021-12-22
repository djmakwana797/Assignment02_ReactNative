import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Button, ScrollView, Pressable, ActivityIndicator, Image, Modal } from 'react-native'
import RadioButtonRN from 'radio-buttons-react-native';
import CheckBox from '@react-native-community/checkbox';
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ImagePicker from 'react-native-image-crop-picker';

export default function JoinClub( {route} ) {
    const [error, setError] = useState({
        imageError:"",
        nameError: "",
        contactError: "",
        emailError: "",
        genderbtnError: "",
        birthDateError: "",
        payMethodError: "",
        tandcError: "",
    })

    const [uri, setUri] = useState('')
    const [name , setName] = useState('')
    const [contact, setContact] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [birthDate, setBdate] = useState('')
    const [payMethod, setPaymethod] = useState('')
    const [imageOptions, setImageOptions] = useState(false)
    const [loader, setLoader] = useState(false)
    const [isImageUploaded, setState] = useState('Upload your image')
    const [isSubmitted, setSubmitted] = useState(false)
    const opt = [
        {
            label: 'male'
        },
        {
            label: 'female'
        }
    ]
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDateSelected, setDate] = useState('Select your Birth Date')
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const paymentMethods = ['Net bancking', 'Google Pay', 'Paytm']

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const tempD = new Date(date)
        var date = tempD.getDate()
        var month = tempD.getMonth() + 1
        var year = tempD.getFullYear()
        setDate(date + '/' + month + '/' + year)
        setBdate(date + '/' + month + '/' + year)
        hideDatePicker();
    };

    const submit = () => {
        if (name != '' && contact != '' && email != '' && gender != '' && birthDate != '' && uri != '' && payMethod != '') {
            if (validateEmail(email)) {
                if (validateContact(contact)) {
                    if(isTandCChecked(toggleCheckBox)){
                        setLoader(true)
                        setTimeout(() => {
                            setLoader(false)
                            setSubmitted(true)
                        }, 5000)
                    }
                }
            }
        }
        else {
            alert('Please provide all details')
        }
    
    }
    const validateEmail = (email) => {
        const emailregex = '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'
        if (email.match(emailregex)) setError({emailError:""})
        else setError({emailError:"Please enter valid email id"}) 
    }

    const validateContact = (contact) => {
        const contactregex = '^[0-9]{10}$'
        if (contact.match(contactregex)) setError({contactError:""})
        else setError({contactError:'Contact number must be of 10 digits'})
    }

    const takePhotoFromCamera = () => {
        setImageOptions(false)
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            console.log(image);
            setUri(image.path)
            setError({imageError:''})
            setState('')
          });
    }

    const selectFromGallery = () => {
        setImageOptions(false)
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
            setUri(image.path)
            setError({imageError:''})
            setState('')
          })
    }

    function SelectedImage(){
        return <Image source={{uri: uri}} style={styles.userImg}/>
    }

    function DefaultImage() {
        return <Image source={require('../assets/icons/user.png')} style={styles.userImg}/>
    }

    function ShowImage(){
        if (isImageUploaded=='') return <SelectedImage/>
        else return <DefaultImage/>
    }

    function Submit(){
        if (loader==true) return <ActivityIndicator size={20} color='white' animating={loader} />
        else return <Text style={styles.submitTxt} onPress={submit}>Submit</Text>
    }

    return (
        <View style={styles.form}>
            <Text style={styles.head}>Register for {route.params.name} Club</Text>
            <ScrollView>
                <Pressable onPress={()=>setImageOptions(true)}>
                    <ShowImage/>
                    <Text style={styles.imgText}>{isImageUploaded}</Text>
                    <Text style={styles.error}>{error.imageError}</Text>
                </Pressable>
                <Modal transparent={true} visible={imageOptions}>
                 <View style={styles.imageOptionsbg}>
                   <View style={styles.imageOptions}>
                    <Pressable style={styles.imageOptionsBtn} onPress={takePhotoFromCamera}>
                        <Text style={styles.imageOptionsTxt}>Camera</Text>
                    </Pressable>
                    <Pressable style={styles.imageOptionsBtn} onPress={selectFromGallery}>
                        <Text style={styles.imageOptionsTxt}>Gallery</Text>
                    </Pressable>
                    <Pressable style={styles.imageOptionsBtn} onPress={()=>setImageOptions(false)}>
                        <Text style={styles.imageOptionsTxt}>Cancel</Text>
                    </Pressable>
                   </View>
                 </View>
               </Modal>
                <TextInput style={styles.formInput} placeholder='Enter your name' onChangeText={name=>{setName(name)}} autoCapitalize='words'></TextInput>
                <Text style={styles.error}>{error.nameError}</Text>
                <TextInput style={styles.formInput} placeholder='Enter mobile number' keyboardType='numeric' onChangeText={m => { setContact(m) }} maxLength={10}></TextInput>
                <Text style={styles.error}>{error.contactError}</Text>
                <TextInput style={styles.formInput} placeholder='Enter your email' keyboardType='email-address' onChangeText={e => { setEmail({e}) }} autoCapitalize='none'></TextInput>
                <Text style={styles.error}>{error.emailError}</Text>
                <RadioButtonRN
                    style={{ margin: 10 }}
                    data={opt}
                    textStyle={styles.rbtn}
                    box={false}
                    activeColor='#333'
                    textColor = '#333'
                    circleSize = {14}
                    selectedBtn={g=>setGender(g['label'])}
                />
                <Text style={styles.error}>{error.genderbtnError}</Text>
                <View>
                    <Pressable onPress={showDatePicker}>
                        <Text style={styles.datePicker}>{isDateSelected}</Text>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </Pressable>
                    <Text style={styles.error}>{error.birthDateError}</Text>
                </View>
               
                <SelectDropdown
                    data={paymentMethods}
                    onSelect={(selectedItem, index) => {
                        setPaymethod(selectedItem)
                    }}
                    defaultButtonText={"Select payment methods"}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                        return item;
                    }}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={(isOpened) => {
                        return (
                            <FontAwesome
                                name={isOpened ? "chevron-up" : "chevron-down"}
                                color={"#444"}
                                size={18}
                            />
                        );
                    }}
                    dropdownIconPosition={"right"}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                />
                <Text style={styles.error}>{error.payMethodError}</Text>
                <View style={styles.tandc}>
                    <CheckBox
                        style={styles.checkbox}
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => {
                            setToggleCheckBox(newValue)
                        }}
                    />
                    <Text style={styles.input}>Accept Terms and Conditions</Text>
                </View>
                <Text style={styles.error}>{error.tandcError}</Text>
                <View style={styles.btn}>
                    <Pressable style={styles.submitbtn}>
                        <Submit/>
                    </Pressable>
                </View>
                <Modal transparent={true} visible={isSubmitted}>
                    <View style={styles.imageOptionsbg}>
                        <View style={styles.submitMessage}>
                            <Text style={styles.submitMessageTxt}>Registration Succesfull!</Text>
                            <Button title='   Ok   ' onPress={()=>setSubmitted(false)}/>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    head: {
        fontSize: 28,
        margin: 5,
        color: '#212738',
        fontFamily: 'RobotoMono-Bold',
        alignSelf: 'center',
    },
    form: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 30
    },
    formInput: {
        padding: 4,
        marginTop: 14,
        marginHorizontal: 10,
        height: 40,
        fontFamily: 'RobotoMono-Medium',
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
    },
    formbtn: {
        width: '30%',
        alignItems: 'center',
        borderRadius: 4,
        margin: 10,
        backgroundColor: 'blue',
    },
    text: {
        fontFamily: 'RobotoMono-Bold',
        padding: 6,
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    rbtn: {
        fontFamily: 'RobotoMono-Medium',
        fontSize: 18,
        color: 'grey'
    },
    btn: {
        margin: 10,
        alignSelf: 'center',
        width: '30%'
    },
    checkbox: {
        marginLeft: 5
    },
    input: {
        marginLeft: 10,
        fontSize: 18,
        fontFamily: 'RobotoMono-medium',
    },
    tandc: {
        flexDirection: 'row',
        marginTop: 10
    },

    dropdown1BtnStyle: {
        width: '95%',
        height: 40,
        marginTop: 10,
        marginHorizontal: 10,
        backgroundColor: "#FFF",
        borderBottomWidth: 1,
        borderColor: "#333",
        fontSize: 18
    },
    dropdown1BtnTxtStyle: { color: "grey", textAlign: "left", fontFamily: 'RobotoMono-Medium'},
    dropdown1DropdownStyle: { backgroundColor: "#FBFBFF" },
    dropdown1RowStyle: {
        backgroundColor: "#FBFBFF",
        borderBottomColor: "#C5C5C5",
    },
    dropdown1RowTxtStyle: { color: "#0d0106", textAlign: "left", fontFamily: 'RobotoMono-Medium' },
    datePicker: {
        flex: 1,
        height: 40,
        marginTop: 10,
        marginHorizontal: 10,
        width: '95%',
        fontSize: 18,
        fontFamily: 'RobotoMono-Medium',
        borderBottomWidth: 1,
        borderColor: "#333",
        padding: 8
    },
    error :{
        color: 'red',
        marginLeft: 14
    },
    userImg :{
        marginTop: 10,
        width: 80,
        height: 80,
        alignSelf: 'center',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'grey'
    },
    imgText:{
        alignSelf: 'center',
        fontSize: 18
    },
    imageOptionsbg:{backgroundColor:"#000000aa", flex:1},
    imageOptions:{alignItems :'center', justifyContent: 'space-evenly',backgroundColor:"#fff", marginVertical:200, marginHorizontal: 60, padding:30, flex:1, borderRadius:10},
    imageOptionsBtn : {backgroundColor:'#657ed4', padding: 12, borderRadius: 4, width: '90%'},
    imageOptionsTxt: {fontSize: 16,color:'#fff', textTransform: 'uppercase', fontWeight: '500',textAlign: 'center' },
    submitbtn: {backgroundColor:'#57c4e5', padding: 10, borderRadius:6, marginBottom:6},
    submitTxt: {color:"#fff",textTransform: 'uppercase', fontWeight: '500',textAlign: 'center', fontSize:16},
    submitMessage: {alignItems :'center', justifyContent: 'space-evenly',backgroundColor:"#fff", marginVertical:250, marginHorizontal: 60, padding:30, flex:1, borderRadius:10},
    submitMessageTxt: {color:'black', fontSize:18}
})