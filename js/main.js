var colors, addedColors;
$(".random-btn").click(function() {
	var color,second_color,primary_color,secondary_color,complement_color;
	color = Math.floor((Math.random() * 360));
	second_color = (color>=180) ? (color-180) : (color+180);
	  /*second_color = hsvToRgb((second_color+10),100,100);
	  toolbar_color = hsvToRgb(color,80,90);
	  status_color = hsvToRgb(color,70,60);*/
	primary_color = hsvToRgb(color,80,90);
	secondary_color = hsvToRgb(color,80,60);
	complement_color = hsvToRgb((second_color+10),100,100);
	colors=[rgbToHex(secondary_color),rgbToHex(primary_color),rgbToHex(complement_color)];
	  //alert( "Colore:"+ res[0] +"-"+ res[1] +"-"+ res[2] );
	/*$(".toolbar").css("background-color",rgbToHex(primary_color));
	$(".status").css("background-color",rgbToHex(secondary_color));
	$(".circle").css("background-color",rgbToHex(complement_color));*/
  	$('.pattern').children('.column').each(function (i) {
  		$(this).css("background-color",colors[i]); 
  		$(this).html(colors[i]);
	});
	$('.box').children('.element').each(function (i) {
  		$(this).css("background-color",colors[i]); 
  		$(this).attr("data-tooltip", colors[i]);
	});
});

// CLICK on color pattern
$('.pattern').on("click",".column",function (i) {
    copyToClipboard(this);
    $('.toast').remove().stop(true,true).toggle();
    $('<div class="toast toasty" style="background-color:rgba('+hexToRgb($(this).html())+',0.2);">'
    	+'Color <b class="toast-color" style="background-color:'
    	+$(this).html()+';">'+$(this).html()+' </b> copied to clipboard.</div>')
    .stop(true,true).prependTo('body').delay(8000).fadeOut(5000, function(){
    	$('.toast').remove();
    })
});

// DEBUG
$(".box").on("click", ".element", function (event) {
    console.log(this);
});

/**
 * HSV to RGB color conversion
 *
 * H runs from 0 to 360 degrees
 * S and V run from 0 to 100
 * 
 * Ported from the excellent java algorithm by Eugene Vishnevsky at:
 * http://www.cs.rit.edu/~ncs/color/t_convert.html
 */
function hsvToRgb(h, s, v) {
	var r, g, b;
	var i;
	var f, p, q, t;
	// Make sure our arguments stay in-range
	h = Math.max(0, Math.min(360, h));
	s = Math.max(0, Math.min(100, s));
	v = Math.max(0, Math.min(100, v));
	// We accept saturation and value arguments from 0 to 100 because that's
	// how Photoshop represents those values. Internally, however, the
	// saturation and value are calculated from a range of 0 to 1. We make
	// That conversion here.
	s /= 100;
	v /= 100;
	if(s == 0) {
		// Achromatic (grey)
		r = g = b = v;
		return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
	}
	h /= 60; // sector 0 to 5
	i = Math.floor(h);
	f = h - i; // factorial part of h
	p = v * (1 - s);
	q = v * (1 - s * f);
	t = v * (1 - s * (1 - f));
	switch(i) {
		case 0:
			r = v;
			g = t;
			b = p;
			break;
		case 1:
			r = q;
			g = v;
			b = p;
			break;
		case 2:
			r = p;
			g = v;
			b = t;
			break;
		case 3:
			r = p;
			g = q;
			b = v;
			break;
		case 4:
			r = t;
			g = p;
			b = v;
			break;
		default: // case 5:
			r = v;
			g = p;
			b = q;
	}
	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}


function hexToRgb(hex) {
	hex=(hex.charAt(0)=="#") ? hex.substring(1,7):hex;
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return r + "," + g + "," + b;
}

function rgbToHex(r,g,b){
	if (arguments.length === 1) {
        return '#' + this.byte2Hex(r[0]) + this.byte2Hex(r[1]) + this.byte2Hex(r[2]);
    }
  return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
}
function byte2Hex (n)
{
  var nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}
function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}

$(function() {
    $('.random-btn').click();
});