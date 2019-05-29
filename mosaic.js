(function($){
    $.fn.pluginJQ  = function (options) {

    var settings = $.extend({
        imagesWidth: 400,
        imegesGap: 10,
        hoverTitle: true,
        textColor: 'black',
    }, options);
 
    function mainObject(ulContainer, settings){
        this.ulContainer = ulContainer;
        this.liImg = this.ulContainer.find('li');
        this.image = this.ulContainer.find('img');
        this.liQuantity = this.liImg.length;
        this.settings = settings;

        mainObject.prototype.init = function (){
            var that = this;
            

            $(window).on('resize load', function(){
                that.calculation(that.ulContainer.width() < that.settings.imagesWidth*2);
            });

            this.image.each(function() {
                $(this).css('margin-bottom' ,that.settings.imegesGap);
            });

            this.hoverEffect();
        };

        mainObject.prototype.calculation = function (single){
            var that = this;

            that.current_column_high = 0;
            that.current_column = 0;
            that.lowest_column = 0;
            that.columnHeight = 0;

            that.quantity = that.settings.imagesWidth+that.settings.imegesGap;
            that.columns = Math.floor(that.ulContainer.width()/that.quantity);
            that.ulContainer.css('width',that.ulContainer.parent().width());

            that.liImg.each(function(index){              
                
                that.current_column = index % that.columns; 
                that.top = 0;

                if(single) {
                    that.current_column = 0;
                    that.left = that.settings.imegesGap;
                } else {
                    that.current_column = index % that.columns;
                    that.left = (that.settings.imagesWidth + that.settings.imegesGap)*that.current_column;
                };

                for(var rm = 0; rm < that.columns; rm++) {
                    $(this).removeClass('column' + rm);
                };       
                
                $(this).addClass('column' + that.current_column);

                $(this).css({
                    'width': that.settings.imagesWidth,
                    'position': 'absolute',
                    'left': that.left,
                });
                
                $(this).prevAll().each(function(index) {
                    if($(this).hasClass('column' + that.current_column)) {
                    
                    that.current_column_high = Math.ceil($(this).outerHeight() + that.settings.imegesGap);
                    that.top += that.current_column_high;
                        
                    };

                    if((that.current_column+1) % that.columns === 0,that.current_column){
                        that.lowest_column = that.top;
                        console.log( that.lowest_column ,that.top,that.current_column_high);  
                    }                   
                });

                $(this).css('top',that.top);
            });
        };

        mainObject.prototype.hoverEffect = function (){
            if(this.settings.hoverTitle){
                this.image
                    .on('mouseover', function () {
                        this.text = $(this).attr('data-title');
                        $(this).css({'opacity': 0.3,'transition': '.5s ease'});
                        $('<div class="text">'+this.text+'</div>').insertAfter(this);
                    })
                    .on('mouseleave', function () {
                        $(this).css('opacity', 1);
                        $(this).parent().find('div').remove();
                    })
                };

            if (this.settings.itemWidth > 220){
                this.fontSize = this.settings.itemWidth*0.05;
            } else {
                this.fontSize = 11;
            };
        };

    };


    return this.each(function() {
        var ulContainer = $(this);
        var start = new mainObject(ulContainer, settings);
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
});


    // $('ul.mosaic2').pluginJQ({
    //     hoverTitle: true, 
    //     imagesWidth: 250,
    //     imegesGap: 20,
    // }); 

    // $('ul.mosaic3').pluginJQ({
    //     hoverTitle: true, 
    //     imagesWidth: 300,
    //     imegesGap: 10,
    //     hoverTitle: false,
    // }); 
    
    // $('ul.mosaic4').pluginJQ({
    //     hoverTitle: true, 
    //     imagesWidth: 100,
    //     imegesGap: 10,
    //     hoverTitle: false,
    // }); 



// if (that.top >= that.current_column_high){
//     that.current_column_high += $(this).outerHeight() + that.settings.imegesGap;
//     that.ulContainer.css('height', that.current_column_high);
// };


// $(this).prevAll().each(function(index) {
//     if($(this).hasClass('column' + that.current_column)) {
//         that.top += $(this).outerHeight() + that.settings.imegesGap;
//     };
// });