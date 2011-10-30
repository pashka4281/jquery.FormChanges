//Form Changes v1.0 2011
//by Paul Ser -- paul.work4281@gmail.com

(function($) {
    // Add .formChanges() function
    $.fn.formChanges = function (settings) {
        if(settings.onChangeVals == undefined || settings.onRestoreVals == undefined)
            throw 'onChangeVals or onRestoreVals callback not defined!'

        var init_vals = [];
        var inputs = $(this).find(":input").not(':hidden, :submit');

        var formChanges ={
            saveDefaults : function(){
                init_vals = getVals();
            },
            form : this
        }

        formChanges.saveDefaults();

        //inputs change() callback
        inputs.change(function(){
            if(!arrays_equal(init_vals, getVals())) 
                settings.onChangeVals.call();
            else
                settings.onRestoreVals.call();
        })

        //gets an array of values of input elements
        function getVals(){
            var tmp = [];
            inputs.each(function(){
                if($(this).attr('type') == 'radio' || $(this).attr('type') == 'checkbox')
                    tmp.push($(this).attr('checked')); 
                else
                    tmp.push($(this).val());
            })
            return tmp;
        }
        //comparing two arrays for equality
        function arrays_equal(a,b) {
            return !(a<b || b<a);
        }
        return formChanges;
    };
})(jQuery);