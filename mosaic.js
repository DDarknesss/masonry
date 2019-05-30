(function($){
    $.fn.pluginJQ  = function (options) {

    var settings = $.extend({
        imagesWidth: 400,
        imegesGap: 10,
        hoverTitle: true,
        textColor: 'black',
    }, options);
 
    function mainObject(mainContainer, settings){
        this.mainContainer = mainContainer;
        this.liImg = this.mainContainer.find('li');
        this.image = this.mainContainer.find('img');
        this.settings = settings;

        mainObject.prototype.init = function (){
            var that = this;

            $(window).on('resize load', function(){
                that.calculation(that.mainContainer.width() < that.settings.imagesWidth*2);
            });

            this.image.each(function() {
                $(this).css('margin-bottom' ,that.settings.imegesGap);
            });

            this.hoverEffect();
        };

        mainObject.prototype.calculation = function (single){
            var that = this;
            that.array_of_heights = [];

            that.itemWidth = that.settings.imagesWidth + that.settings.imegesGap;
            that.columns = Math.floor(that.mainContainer.width()/that.itemWidth);
            that.mainContainer.css('width',that.mainContainer.parent().width());
            that.current_image_high = 0;
            that.current_column = 0;
            that.lowest_column = 0;
            that.columnHeight = 0;
            that.chunk = [];
 

        that.liImg.each(function(index){              
 
            that.top = 0;

            if(single) {
                that.current_column = 0;
                that.left = that.settings.imegesGap;
            } else {
                that.current_column = that.lowest_column;
                that.left = that.itemWidth*that.current_column;
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

            that.current_image_high = Math.ceil($(this).height() + that.settings.imegesGap);

            console.log(that.top);

            if(that.array_of_heights.length >= that.columns){
                that.array_of_heights[that.lowest_column] += that.current_image_high;
            } else {
                that.array_of_heights.push(that.current_image_high);
            };
            
            console.log(that.array_of_heights)
            
            that.lowest_column = that.array_of_heights.indexOf(Math.min.apply(Math,that.array_of_heights));         
            that.top = that.array_of_heights[that.lowest_column];

            console.log(that.top)

            $(this).css('top',that.top);
    });

};


        mainObject.prototype.chunkArray = function (myArray, chunk_size){
            this.results = [];
            
            while (myArray.length) {
                this.results.push(myArray.splice(0, chunk_size));
            };

            return this.results;
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
        var mainContainer = $(this);
        var start = new mainObject(mainContainer, settings);
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
