import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Button, ScrollView, Pressable, ActivityIndicator, Image, Modal } from 'react-native'
import RadioButtonRN from 'radio-buttons-react-native';
import CheckBox from '@react-native-community/checkbox';
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ImagePicker from 'react-native-image-crop-picker';

export default function JoinClub( {route} ) {

    const [imageError, setimageError] = useState('')
    const [nameError, setnameError] = useState('')
    const [contactError, setcontactError] = useState('')
    const [emailError, setemailError] = useState('')
    const [genderbtnError, setgenderbtnError] = useState('')
    const [birthDateError, setbirthDateError] = useState('')
    const [payMethodError, setpayMethodError] = useState('')
    const [tandcError, settandcError] = useState('')

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
        setbirthDateError('')
        hideDatePicker();
    };

    const submit = () => {
        name == '' ? setnameError('Name is required') : null
        contact == '' ? setcontactError('Contact is required') : null
        email == '' ? setemailError('Email is required') : null
        gender == '' ? setgenderbtnError('Gender is required') : null
        birthDate == '' ? setbirthDateError('BirthDate is required') : null
        uri == '' ? setimageError('Image is required') : null
        payMethod == '' ? setpayMethodError('Payment method is required') : null
        toggleCheckBox == false ? settandcError('Please accept terms and conditions to proceed') : null
        if(name!='' && email!='' && uri!='' && birthDate!='' && gender!='' && payMethod!='' && toggleCheckBox==true && contact!=''){
            setLoader(true)
            setTimeout(() => {
                setLoader(false)
                setSubmitted(true)
            }, 5000)
        }
    }
    const validateEmail = (e) => {
        setEmail(e)
        const emailRegex = /\S+@\S+\.\S+/
        emailRegex.test(e) ? setemailError("") : setemailError("Please enter valid email id") 
    }

    const validateName = (name) => {
        setName(name)
        name == '' ? setnameError('Name is required') : setnameError('')
    }

    const validateContact = (c) => {
        setContact(c)
        const contactregex = /^[0-9]{10}$/
        contactregex.test(c) ? setcontactError("") : setcontactError('Contact number must be of 10 digits')
    }

    const takePhotoFromCamera = () => {
        setImageOptions(false)
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            setUri(image.path)
            setimageError('')
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
            setUri(image.path)
            setimageError('')
            setState('')
          })
    }

    return (
        <View style={styles.form}>
            <Text style={styles.head}>Register for {route.params.name} Club</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Pressable onPress={()=>setImageOptions(true)}>
                    {isImageUploaded=='' ? <Image source={{uri: uri}} style={styles.userImg}/>
                    :   <Image source={require('../assets/icons/user.png')} style={styles.userImg}/>
                    }
                    <Text style={styles.imgText}>{isImageUploaded}</Text>
                    {imageError != ''? <Text style={styles.error}>{imageError}</Text> : null}
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

                <Text style={styles.label}>Name </Text>
                <TextInput style={styles.formInput} placeholder='Enter your name' onChangeText={name=>validateName(name)} autoCapitalize='words'></TextInput>
                {nameError!='' ? <Text style={styles.error}>{nameError}</Text> : null}

                <Text style={styles.label}>Contact </Text>
                <TextInput style={styles.formInput} placeholder='Enter mobile number' keyboardType='numeric' onChangeText={m => validateContact(m)} maxLength={10}></TextInput>
                {contactError!=''?<Text style={styles.error}>{contactError}</Text>:null}

                <Text style={styles.label}>Email </Text>
                <TextInput style={styles.formInput} placeholder='Enter your email' keyboardType='email-address' onChangeText={e =>  validateEmail(e)} autoCapitalize='none'></TextInput>
                {emailError!=''?<Text style={styles.error}>{emailError}</Text>:null}
                <RadioButtonRN
                    style={{ margin: 10 }}
                    data={opt}
                    textStyle={styles.rbtn}
                    box={false}
                    activeColor='#333'
                    textColor = '#333'
                    circleSize = {14}
                    selectedBtn={g=>{
                        setGender(g['label'])
                        setgenderbtnError('')
                    }}
                />
                {genderbtnError!=''?<Text style={styles.error}>{genderbtnError}</Text>:null}
                <Text style={styles.label}>Birth Date </Text>
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
                    {birthDateError!=''?<Text style={styles.error}>{birthDateError}</Text>:null}
                </View>
               
                <Text style={styles.label}>Payment method </Text>
                <SelectDropdown
                    data={paymentMethods}
                    onSelect={(selectedItem, index) => {
                        setPaymethod(selectedItem)
                        setpayMethodError('')
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
                {payMethodError!=''?<Text style={styles.error}>{payMethodError}</Text>:null}
                <View style={styles.tandc}>
                    <CheckBox
                        style={styles.checkbox}
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => {
                            setToggleCheckBox(newValue)
                            settandcError('')
                        }}
                    />
                    <Text style={styles.input}>Accept Terms and Conditions</Text>
                </View>
                {tandcError!=''?<Text style={styles.error}>{tandcError}</Text>:null}
                <View style={styles.btn}>
                    <Pressable style={styles.submitbtn}>
                    {loader==true ? 
                        <ActivityIndicator size={20} color='white' animating={loader} />
                    :   <Text style={styles.submitTxt} onPress={submit}>Submit</Text>
                    }
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
        marginBottom: 4,
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
        marginTop: 4,
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
        marginBottom: 10,
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
        marginBottom: 10,
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
    submitMessageTxt: {color:'black', fontSize:18},
    label:{marginLeft:10, marginTop: 4}
})