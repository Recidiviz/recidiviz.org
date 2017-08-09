;( function( window ) {

	'use strict';

    var cloneObj = $("#state-prisons-table").clone();

    function stateSelect (form) {
        var selectedState = form.fields[0].elOriginal.value;

        $.getJSON( "../data/wikipedia/state_prisons.json", function( prisonsByState ) {
            var statePrisonsWithRandomRates = prisonsByState.map(function (state) {
                var publicPrisons = state['public'];
                var privatePrisons = state['private'];

                var publicPrisonsWithRandomRates = [];
                if (!_.isNil(publicPrisons)) {
                    publicPrisonsWithRandomRates = publicPrisons.map(function (prison) {
                        return {
                            "Prison Name": prison,
                            "Type": "public",
                            "Recidivism Rate": (Math.random() * 100).toFixed(2)
                        }
                    });
                }

                var privatePrisonsWithRandomRates = [];
                if (!_.isNil(privatePrisons)) {
                    privatePrisonsWithRandomRates = privatePrisons.map(function (prison) {
                        return {
                            "Prison Name": prison,
                            "Type": "private",
                            "Recidivism Rate": (Math.random() * 100).toFixed(2)
                        }
                    });
                }

                var prisonsWithRandomRates = publicPrisonsWithRandomRates.concat(privatePrisonsWithRandomRates);
                prisonsWithRandomRates.sort(function (left, right) {
                    return right['Recidivism Rate'] - left['Recidivism Rate'];
                });
                prisonsWithRandomRates = prisonsWithRandomRates.map(function (prison) {
                    var rate = prison["Recidivism Rate"];
                    return {
                        "Prison Name": prison["Prison Name"],
                        "Type": prison["Type"],
                        "Recidivism Rate": (rate < 10 ? '0' : '') + rate + "%"
                    };
                });

                return {
                    "state": state['state'],
                    "prisons": prisonsWithRandomRates
                };
            });

            var prisonsByStateWithRandomRates = _.keyBy(statePrisonsWithRandomRates, entry => entry.state);

            $('div#state-prisons-table').replaceWith(cloneObj.clone());
            $('div#state-prisons-table').columns({ data : prisonsByStateWithRandomRates[selectedState]['prisons'] });
        });
    };

    window.stateSelect = stateSelect;
} )( window );
