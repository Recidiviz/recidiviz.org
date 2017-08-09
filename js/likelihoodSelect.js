;( function( window ) {

    function likelihoodSelect (form) {
        var age, race, sex, history, offense;
        var fields = form.fields;
        fields.forEach(function (field) {
            var value = field.elOriginal.value;
            switch (field.elOriginal.name) {
                case 'age':
                    age = value;
                    break;
                case 'race':
                    race = value;
                    break;
                case 'sex':
                    sex = value;
                    break;
                case 'history':
                    history = value;
                    break;
                case 'offense':
                    offense = value;
                    break;
            }
        });

        $.getJSON( "../data/bjsgov/single_parameter_permutations.json", function( json ) {
            var cumulativeRecidivismRates = json[age][sex][race][history][offense];

            if ($.isEmptyObject(cumulativeRecidivismRates)) {
                $('div#nl-form-likelihood-results').text("unknown");
                return;
            }

            var timeUntilLikelihood = "more than 5 years";
            ['6 months', '1 Year', '2 Years', '3 Years', '4 Years', '5 Years'].some(function (time) {
                if (cumulativeRecidivismRates[time] > 50) {
                    timeUntilLikelihood = time.toLowerCase();
                    return true;
                }
            });

            $('div#nl-form-likelihood-results').text(timeUntilLikelihood);
        });
    };

    window.likelihoodSelect = likelihoodSelect;

} )( window );
