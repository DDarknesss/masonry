(function($){
    $.fn.pluginJQ  = function (options) {

    var settings = $.extend({
        imegesGap: 10,
        imagesWidth: 400,
        hoverTitle: true,
        background: 'pink',
    }, options);
 
    function mainObject(mainContainer){

        this.settings = settings;
        this.mainContainer = mainContainer;
        this.liImg = this.mainContainer.find('li');
        this.image = this.mainContainer.find('img');
        

        mainObject.prototype.init = function (){
            var that = this;
            this.hoverEffect();

            $(window).on('resize load', function(){
                that.calculation();
            });
        };
        
        mainObject.prototype.hoverEffect = function (){
            
            if (this.settings.itemWidth < 220){
                this.fontSize = 11;
            } else {
                this.fontSize = this.settings.itemWidth*0.05;
            };

            if(this.settings.hoverTitle){
                this.image
                    .on('mouseleave', function () {
                        $(this).css('opacity', 1);
                        $(this).parent().find('div').remove();
                    })
                    .on('mouseover', function () {
                        this.text = $(this).attr('data-title');
                        $(this).css({'opacity': 0.3,'transition': '.5s ease'});
                        $('<div class="text">'+this.text+'</div>').insertAfter(this);
                    });
                };
        };

        mainObject.prototype.calculation = function (){
            var that = this;

            that.itemWidth = that.settings.imagesWidth + that.settings.imegesGap;
            that.mainContainer.css('width',that.mainContainer.parent().width());
            that.cls = Math.floor(that.mainContainer.width()/that.itemWidth);
            that.arr_of_heights = Array(that.cls).fill(0);
            that.current_image_high = 0;
            that.lowest_cl = 0;
            that.top = 0;


            that.liImg.each(function(){

                for( var rm = 0; rm < that.cls; rm++ ) {
                    $(this).removeClass('cl' + rm);
                };

                $(this)
                    .addClass('cl' + that.lowest_cl)
                    .css({
                        'position': 'absolute',
                        'width': that.settings.imagesWidth,
                        'left': that.itemWidth*that.lowest_cl + that.settings.imegesGap,
                    });
                    
                that.top = that.arr_of_heights[that.lowest_cl];
                that.current_image_high = $(this).height() + that.settings.imegesGap;
                
                if( that.arr_of_heights.length >= that.cls ){
                    that.arr_of_heights[that.lowest_cl] += that.current_image_high;
                };
                
                that.lowest_cl = that.arr_of_heights.indexOf(Math.min.apply(Math,that.arr_of_heights));    
                
                $(this).css('top',that.top);
                that.mainContainer.css({
                    'height': Math.max.apply(Math,that.arr_of_heights)+50,
                    'background' : that.settings.background,
                });
            });
        };
    };


    return this.each(function() {
        var start = new mainObject($(this));
        start.init();
        return this;
    });
 };
}( jQuery ));
    


$(document).ready(function(){
    $('ul.mosaic1').pluginJQ({
        hoverTitle: true, 
        imagesWidth: 200,
        imegesGap: 10,
    }); 
    
    $('ul.mosaic2').pluginJQ({
        hoverTitle: true, 
        imagesWidth: 250,
        imegesGap: 20,
        background: 'white',
    }); 

    $('ul.mosaic3').pluginJQ({
        hoverTitle: true, 
        imagesWidth: 300,
        imegesGap: 10,
        hoverTitle: false,
        background: 'orange',
    }); 

    $('ul.mosaic4').pluginJQ({
        hoverTitle: true, 
        imagesWidth: 100,
        imegesGap: 10,
        hoverTitle: false,
        background: '#ff00ff',
    }); 
});