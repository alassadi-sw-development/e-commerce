export const deliveryOptions = [
    {
        id: '1',
        deliveryDate: getDateAfter7Days(),
        priceCents: 0
    },
    {
        id: '2',
        deliveryDate: getDateAfter3Days(),
        priceCents: 499
    },
    {
        id: '3',
        deliveryDate: getDateAfter1Days(),
        priceCents: 999
    }
];

function getDateAfter7Days() {
    let today = new Date();
    let after7Days = new Date(today);
    after7Days.setDate(today.getDate() + 7);
    let options = { weekday: 'long', month: 'long', day: 'numeric' };
    let formattedDate = after7Days.toLocaleString('en-US', options);
    return formattedDate;
}
function getDateAfter3Days() {
    // Get today's date
    let today = new Date();

    // Add 7 days to today's date
    let after3Days = new Date(today);
    after3Days.setDate(today.getDate() + 3);

    // Format the date
    let options = { weekday: 'long', month: 'long', day: 'numeric' };
    let formattedDate = after3Days.toLocaleString('en-US', options);

    return formattedDate;
}
function getDateAfter1Days() {
    // Get today's date
    let today = new Date();

    // Add 7 days to today's date
    let after1Days = new Date(today);
    after1Days.setDate(today.getDate() + 1);

    // Format the date
    let options = { weekday: 'long', month: 'long', day: 'numeric' };
    let formattedDate = after1Days.toLocaleString('en-US', options);

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