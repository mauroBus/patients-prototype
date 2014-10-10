
angular.module('patientsApp')

.factory('Statistics', function() {
    var statistics = [
      {
        key: "Removed",
        y: 0
      },
      {
        key: "Created",
        y: 0
      },
      {
        key: "Updated",
        y: 0
      },
      {
        key: "Total Patients",
        y: 0

      }
    ];

    return {
      patientRemoved: function() {
        statistics[0].y++;
        statistics[3].y--;
      },
      patientCreated: function() {
        statistics[1].y++;
        statistics[3].y++;
      },
      patientUpdated: function() {
        statistics[2].y++;
      },
      setPatientsCount: function(count) {
        statistics[3].y = count;
      },

      getData: function() {
        return statistics;
      },

      xFunction: function() {
        return function(d) {
          return d.key;
        };
      },

      yFunction: function() {
        return function(d){
          return d.y;
        };
      },

      description: function() {
        return function(d) {
          return d.key + ': ' + d.y;
        };
      }

    };
  }
);
