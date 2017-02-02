import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return Ember.Object.create({
            startSearchArea: { bounds: {east: -79.9, north: 43.8, south: 43.1, west: -81.1} },
            mapCenter: {lat: 43.4, lng: -80.5, zoom: 10},
            address: { line1: "", line2: "", city: "", province: "", postalCode: "" }
        });
    }
});
