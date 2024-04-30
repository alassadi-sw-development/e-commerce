export const deliveryOptions = [
    {
        id: '1',
        deliveryDate: getDateAfterDays(7),
        priceCents: 0
    },
    {
        id: '2',
        deliveryDate: getDateAfterDays(3),
        priceCents: 499
    },
    {
        id: '3',
        deliveryDate: getDateAfterDays(1),
        priceCents: 999
    }
];

function getDateAfterDays(numDays) {
    let today = new Date();

    let afterDays = new Date(today);
    afterDays.setDate(today.getDate() + numDays);

    let options = { weekday: 'long', month: 'long', day: 'numeric' };
    let formattedDate = afterDays.toLocaleString('en-US', options);

    return formattedDate;
}

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((option)=>{
        if(option.id === deliveryOptionId){
            deliveryOption = option;
        }
    });
    return deliveryOption;
}