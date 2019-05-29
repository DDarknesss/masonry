(function($){

    $.fn.pluginJQ  = function (options) {

    var settings = $.extend({
        itemWidth: 400,
        itemsGap: 10,
        title: true,
        textColor: 'black',
    }, options);
 
var methods = {
 
    init : function (mosaiq){
        
        var image = mosaiq.find('img');
        var imageContent = mosaiq.find('li');
        var fontSize;

        if (settings.itemWidth < 220){
            fontSize = 11;
        } else {
            fontSize = settings.itemWidth*0.05;
        };

        if(settings.title){
            image
            .on('mouseover', function () {
                var text = $(this).attr('data-title');
                $('<div class="text">'+text+'</div>').insertAfter(this)
                $(this).css({'opacity': 0.3,'transition': '.5s ease'});
            })
            .on('mouseleave', function () {
                $(this).css('opacity', 1)
                $(this).parent().find('div').remove();
            })
        };

        mosaiq.css({
            'column-width':settings.itemWidth,
            'column-gap':settings.itemsGap,
            'color': settings.textColor,
            'font-size': fontSize,
        });

        imageContent.css('margin-bottom', settings.itemsGap);

        
    },
}


    function mainObject(mosaiq, settings){

        this.mosaiq = mosaiq;
        this.settings = settings;
        this.image = this.mosaiq.find('img');
        this.imageContent = this.mosaiq.find('li');

        mainObject.prototype.init =  function (){

            if (this.settings.itemWidth < 220){
                this.fontSize = 11;
            } else {
                this.fontSize = this.settings.itemWidth*0.05;
            }

            this.mosaiq.css({
                'column-width':this.settings.itemWidth,
                'column-gap':this.settings.itemsGap,
                'color': this.settings.textColor,
                'font-size': this.fontSize,
            });
            this.imageContent.css({'margin-bottom' : this.settings.itemsGap});

            if(this.settings.title){

                this.image
                .on('mouseover', function () {
                    this.text = $(this).attr('data-title');
                    $('<div class="text">'+this.text+'</div>').insertAfter(this)
                    $(this).css({'opacity': 0.3,'transition': '.5s ease'});
                })
                .on('mouseleave', function () {
                    $(this).css('opacity', 1)
                    $(this).parent().find('div').remove();
                })
            }
        };
    };


    return this.each(function() {
        var mosaiq = $(this);
        // var start = new mainObject(mosaiq, settings);
        // start.init();
        methods.init(mosaiq)

        return this;
    });
 };
}( jQuery ));
    

$(document).ready(function(){
    $('ul.mosaic1').pluginJQ({
        title: true, 
        itemWidth: 300,
        itemsGap: 12,
    });

    $('ul.mosaic2').pluginJQ({});

    $('ul.mosaic3').pluginJQ({
        title: false,
        itemWidth: 200,
        itemsGap: 10,
        textColor: 'purple',
    });

    $('ul.mosaic4').pluginJQ({
        itemWidth: 190,
        itemsGap: 15,
        textColor: 'red'
    });
    
});