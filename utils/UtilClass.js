const editList = (list, operator, sku, allowZeroQuantities) => {
    return list.map(item => {
        var temp = Object.assign({}, item);
        if (temp.sku === sku) {
            if(operator ==='+') {
                temp.quantity = temp.quantity + 1;
            } else {
                if(temp.quantity > 1) {
                    temp.quantity = temp.quantity - 1;
                } else {
                    temp.quantity = 0;
                }
            }
        }
        return temp;
    }).filter(item => {
        if(allowZeroQuantities) {
            return true;
        } else {
            if(item.quantity <= 0) {
                return false;
            } else {
                return true;
            }
        }
    });
}

const parseDog = (dog, withId) => {
    var newDog = {
        breedname:dog.breedname,
        description:dog.description,
        allergies:dog.allergies,
        likes:dog.likes,
        disLikes:dog.disLikes,
        ageInMonths:dog.ageInMonths,
        hourlyPrice:dog.hourlyPrice,
        photo:dog.photo,
        ownerId:dog.ownerId,
        active:dog.active
    };
    if(withId) newDog.dogId=dog.dogId;
    return newDog;
}

const parseUser = (user, withId) => {
    var newUser = {
        name:user.name,
        email:user.email,
        userType:user.userType,
        password:user.password,
        phone:user.phone,
        address:user.address
    };
    if(withId) newUser.userId=user.userId;
    return newUser;
}

const parseBooking = (booking, customer, owner, dog) => {
    var bookingNew ={}
    bookingNew.customer = customer
    bookingNew.owner = owner
    bookingNew.dog = dog
    bookingNew.id = booking._id
    bookingNew.hours = booking.hours
    bookingNew.status = booking.status
    bookingNew.timestamp = booking.timestamp
    return bookingNew;
}

module.exports = { 'editList': editList, 'parseDog': parseDog, 'parseUser': parseUser, 'parseBooking': parseBooking }