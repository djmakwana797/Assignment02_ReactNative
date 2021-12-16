import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Button, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import RadioButtonRN from 'radio-buttons-react-native';
import CheckBox from '@react-native-community/checkbox';
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ImagePicker from 'react-native-image-crop-picker';

export default function JoinClub( {route} ) {
    const [loader, setLoader] = useState(false)
    const [name, setName] = useState('')
    const [contact, setContact] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [birthDate, setBdate] = useState('')
    const [uri, setUri] = useState(null)
    const [paymethod, setPaymentMethod] = useState('')
    const [isImageUploaded, setState] = useState('Upload your image')
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

    const pickImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            const temp = image.path
            setUri({ temp })
            setState('Image uploaded')
        });
    }
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const paymentMethods = ['Net bancking', 'Google Pay', 'Paytm']

    const submit = () => {
        if (name != '' && contact != '' && email != '' && gender != '' && birthDate != '' && uri != null && paymethod != '') {
            if (validateEmail(email)) {
                if (validateContact(contact)) {
                    if(isTandCChecked(toggleCheckBox)){
                        setLoader(true)
                        setTimeout(() => {
                            setLoader(false)
                            alert('Your details are saved')
                        }, 5000)
                    }
                }
            }
        }
        else alert('Please provide all details')
    }

    const validateEmail = (email) => {
        const emailregex = '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'
        if (email.match(emailregex)) return true
        else alert("Please enter valid email id")
    }

    const validateContact = (contact) => {
        if (contact.length == 10) return true
        else alert('Contact number must be of 10 digits')
    }

    const isTandCChecked = (c) => {
        if(c!=true) alert("Pleact accept terms and conditions")
        else return true
    }
    return (
        <View style={styles.form}>
            <ActivityIndicator size={30} color='darkblue' animating={loader} te />
            <Text style={styles.head}>Register for {route.params.name} Club</Text>
            <ScrollView>
                <TextInput style={styles.formInput} placeholder='Enter your name' onChangeText={name => { setName(name) }}></TextInput>
                <TextInput style={styles.formInput} placeholder='Enter mobile number' keyboardType='numeric' onChangeText={m => { setContact(m) }}></TextInput>
                <TextInput style={styles.formInput} placeholder='Enter your email' keyboardType='email-address' onChangeText={e => { setEmail(e) }}></TextInput>
                <RadioButtonRN
                    style={{ margin: 10 }}
                    data={opt}
                    textStyle={styles.rbtn}
                    textColor='#212738'
                    selectedBtn={g=>setGender(g['label'])}
                />
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
                </View>
                <View>
                    <Pressable onPress={pickImage}>
                        <Text style={styles.datePicker}>{isImageUploaded}</Text>
                    </Pressable>
                </View>
                <SelectDropdown
                    data={paymentMethods}
                    onSelect={(selectedItem, index) => {
                        setPaymentMethod(selectedItem)
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
                <View style={styles.btn}>
                    <Button
                        title='submit'
                        onPress={submit}
                    />
                </View>
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
        marginTop: 20,
        marginHorizontal: 10,
        height: 50,
        borderWidth: 1,
        fontFamily: 'RobotoMono-Medium',
        fontSize: 20,
        borderColor: '#333',
        borderRadius: 5,
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
        fontSize: 20,
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
        fontSize: 20,
        fontFamily: 'RobotoMono-medium'
    },
    tandc: {
        flexDirection: 'row',
        marginTop: 5
    },

    dropdown1BtnStyle: {
        width: '95%',
        height: 50,
        margin: 10,
        backgroundColor: "#FFF",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#333",
        fontSize: 20
    },
    dropdown1BtnTxtStyle: { color: "#444", textAlign: "left", fontFamily: 'RobotoMono-Medium' },
    dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
    dropdown1RowStyle: {
        backgroundColor: "#EFEFEF",
        borderBottomColor: "#C5C5C5",
    },
    dropdown1RowTxtStyle: { color: "#444", textAlign: "left", fontFamily: 'RobotoMono-Medium' },
    datePicker: {
        flex: 1,
        height: 50,
        margin: 10,
        width: '95%',
        fontSize: 20,
        fontFamily: 'RobotoMono-Medium',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#333",
        padding: 8
    }
})