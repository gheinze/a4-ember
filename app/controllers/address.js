import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {

        locationUpdated: function(placeResult) {
            this.model.set('address', extractAddressFrom(placeResult));
            this.setProperties({
                markers: Ember.A([{
                    id: 'address-marker-id',
                    lat: placeResult.lat,
                    lng: placeResult.lng
                }])
            });
            var currentZoomLevel = this.model.get('mapCenter').zoom;
            this.model.set('mapCenter', {lat: placeResult.lat, lng: placeResult.lng, zoom: currentZoomLevel});
        }

    }
});



function extractAddressFrom(placeResult) {

    var newAddress = {};

    var addressComponents = {
        street_number: {format: 'short_name', modelAttribute: 'streetNumber'},
        route:         {format: 'long_name',  modelAttribute: 'line1'},
        locality:      {format: 'long_name',  modelAttribute: 'city'},
        administrative_area_level_1: {format: 'short_name', modelAttribute: 'province'},
        country:       {format: 'long_name',  modelAttribute: 'country'},
        postal_code:   {format: 'short_name', modelAttribute: 'postalCode'}
    };

    for (var i = 0; i < placeResult.place.address_components.length; i++) {
        var addressType = placeResult.place.address_components[i].types[0];
        var addressComponent = addressComponents[addressType];
        if (addressComponent) {
            var val = placeResult.place.address_components[i][addressComponent.format];
            newAddress[addressComponent.modelAttribute] = val;
        }
    }

    if (newAddress.streetNumber) {
        newAddress.line1 = newAddress.streetNumber + " " + newAddress.line1;
    }

    newAddress.lat = placeResult.lat;
    newAddress.lng = placeResult.lng;

    return newAddress;

}
