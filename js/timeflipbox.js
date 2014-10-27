/*
 * jQuery-Mobile-DateBox 
 * Date: Fri Oct 3 2014 17:22:11 UTC
 * http://dev.jtsage.com/jQM-DateBox/
 * https://github.com/jtsage/jquery-mobile-datebox
 *
 * Copyright 2010, 2014 JTSage. and other contributors
 * Released under the MIT license.
 * https://github.com/jtsage/jquery-mobile-datebox/blob/master/LICENSE.txt
 *
 */


/* CORE Functions */

(function( $ ) {

	$.widget( "mobile.datebox", {
		initSelector: "input[data-role='datebox']",
		options: {
			// All widget options, including some internal runtime details

			// 3-jQueryMobileVersion
			// Check Header for Build Date.
			version: "3-1.4.4-01", 

			theme: false,
			themeDefault: "a",
			themeHeader: "a",
			mode: false,

			transition: "fade",
			useAnimation: true,
			hideInput: false,
			hideContainer: false,

			lockInput: true,

			zindex: "1100",
			clickEvent: "vclick",
			clickEventAlt: "click",

			defaultValue: false,
			showInitialValue: false,

			popupPosition: false,
			popupForceX: false,
			popupForceY: false,

			useModal: true,
			useModalTheme: "b",
			useInline: false,
			useInlineBlind: false,
			useHeader: true,
			useImmediate: false,

			useButton: true,
			buttonIcon: false,
			buttonIconDate: "calendar",
			buttonIconTime: "clock",
			useFocus: false,
			useClearButton: false,
			useCollapsedBut: false,
			usePlaceholder: false,

			openCallback: false,
			openCallbackArgs: [],
			closeCallback: false,
			closeCallbackArgs: [],

			startOffsetYears: false,
			startOffsetMonths: false,
			startOffsetDays: false,
			afterToday: false,
			beforeToday: false,
			notToday: false,
			maxDays: false,
			minDays: false,
			maxYear: false,
			minYear: false,
			blackDates: false,
			blackDatesRec: false,
			blackDays: false,
			whiteDates: true,
			minHour: false,
			maxHour: false,
			minuteStep: 1,
			minuteStepRound: 0,

			rolloverMode: { 
				"m": true,
				"d": true,
				"h": true,
				"i": true,
				"s": true
			},

			useLang: "default",
			lang: {
				"default" : {
					setDateButtonLabel: "Set Date",
					setTimeButtonLabel: "Set Time",
					setDurationButtonLabel: "Set Duration",
					calTodayButtonLabel: "Jump to Today",
					calTomorrowButtonLabel: "Jump to Tomorrow",
					titleDateDialogLabel: "Set Date",
					titleTimeDialogLabel: "Set Time",
					daysOfWeek: [
						"Sunday", "Monday", "Tuesday", 
						"Wednesday", "Thursday", "Friday", 
						"Saturday"
					],
					daysOfWeekShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
					monthsOfYear: [
						"January", "February", "March", "April", "May", "June",
						"July", "August", "September", "October", "November", "December"
					],
					monthsOfYearShort: [
						"Jan", "Feb", "Mar", "Apr", "May", "Jun",
						"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
					],
					durationLabel: ["Days", "Hours", "Minutes", "Seconds"],
					durationDays: ["Day", "Days"],
					timeFormat: 24,
					headerFormat: "%A, %B %-d, %Y",
					tooltip: "Open Date Picker",
					nextMonth: "Next Month",
					prevMonth: "Previous Month",
					dateFieldOrder: ["m", "d", "y"],
					timeFieldOrder: ["h", "i", "a"],
					slideFieldOrder: ["y", "m", "d"],
					dateFormat: "%Y-%m-%d",
					useArabicIndic: false,
					isRTL: false,
					calStartDay: 0,
					clearButton: "Clear",
					durationOrder: ["d", "h", "i", "s"],
					meridiem: ["AM", "PM"],

					// 12HR: "%l:%M %p"
					// 24HR: "%k:%M" 
					timeOutput: "%k:%M", 
					durationFormat: "%Dd %DA, %Dl:%DM:%DS",
					calDateListLabel: "Other Dates",
					calHeaderFormat: "%B %Y"
				}
			}
		},
		_enhanceDate: function() {
			$.extend(this._date.prototype, {
				copy: function( adjust, override ) {
					// Get a modified copy of the date.
					// First array - Offset the new date by #  
					//    (position determines date part)
					// Second array - If non-zero, force the new date by # 
					//    (position determines date part)
					
					adjust = $.extend( [0,0,0,0,0,0,0], adjust );
					override = $.extend( [0,0,0,0,0,0,0], override );
					return new Date(
						((override[0] > 0 ) ? override[0] : this.get(0) + adjust[0]),
						((override[1] > 0 ) ? override[1] : this.get(1) + adjust[1]),
						((override[2] > 0 ) ? override[2] : this.get(2) + adjust[2]),
						((override[3] > 0 ) ? override[3] : this.get(3) + adjust[3]),
						((override[4] > 0 ) ? override[4] : this.get(4) + adjust[4]),
						((override[5] > 0 ) ? override[5] : this.get(5) + adjust[5]),
						((override[6] > 0 ) ? override[5] : this.get(6) + adjust[6]));
				},
				adj: function (type, amount) {
					// Adjust the date.  Yes, this is chainable 
					if ( typeof amount !== "number" || typeof type !== "number" ) {
						throw new Error( "Invalid Arguments" );
					}
					switch ( type ) {
						case 0: this.setD( 0, this.get(0) + amount ); break;
						case 1: this.setD( 1, this.get(1) + amount ); break;
						case 2: this.setD( 2, this.get(2) + amount ); break;
						case 3: amount *= 60;
							/* falls through */
						case 4: amount *= 60;
							/* falls through */
						case 5: amount *= 1000;
							/* falls through */
						case 6: this.setTime( this.getTime() + amount ); break;
					}
					return this;
				},
				setD: function(type, amount) {
					// A chainable version of setWhatever() 
					switch ( type ) {
						case 0: this.setFullYear(amount); break;
						case 1: this.setMonth(amount); break;
						case 2: this.setDate(amount); break;
						case 3: this.setHours(amount); break;
						case 4: this.setMinutes(amount); break;
						case 5: this.setSeconds(amount); break;
						case 6: this.setMilliseconds(amount); break;
					}
					return this;
				},
				get: function(type) {
					// Chainable version of get. Also shorter.
					switch ( type ) {
						case 0: return this.getFullYear();
						case 1: return this.getMonth();
						case 2: return this.getDate();
						case 3: return this.getHours();
						case 4: return this.getMinutes();
						case 5: return this.getSeconds();
						case 6: return this.getMilliseconds();
					}
					return false;
				},
				get12hr: function() {
					if ( this.get(3) === 0 ) { return 12; }
					if ( this.get(3) < 13 ) { return this.get(3); }
					return this.get(3) - 12;
				},
				iso: function() {
					var arr = [0,0,0], i = 0;
					for ( i=0; i < 3; i++ ) {
						arr[ i ] = this.get( i );
						if ( i === 1 ) { arr[ i ]++; }
						if ( arr[i] < 10 ) { arr[ i ] = "0" + String( arr[ i ] ); }
					}
					return arr.join( "-" );
				},
				comp: function () {
					return parseInt( this.iso().replace( /-/g, "" ), 10 );
				},
				getEpoch: function() {
					return Math.floor( this.getTime() / 1000);
				},
				getArray: function() {
					var arr = [0,0,0,0,0,0], i = 0;
					for ( i = 0; i < 6; i++ ) {
						arr[i] = this.get(i);
					}
					return arr;
				},
				setFirstDay: function (day) {
					// Grabs first valid (day) of current month
					this.setD( 2, 1 ).adj( 2, ( day - this.getDay() ) );
					if ( this.get( 2 ) > 10 ) { this.adj( 2, 7 ); }
					return this;
				},
				setDWeek: function (type,num) {
					if ( type === 4 ) {
						return this.setD(1,0).setD(2,1).setFirstDay(4).adj(2,-3).adj(2,(num-1)*7);
					}
					return this.setD(1,0).setD(2,1).setFirstDay(type).adj(2,(num-1)*7);
				},
				getDWeek: function (type) {
					var t1, t2;

					switch ( type ) {
						case 0:
							t1 = this.copy([0,-1*this.getMonth()]).setFirstDay(0);
							return Math.floor(
								( this.getTime() - ( t1.getTime() + (
									( this.getTimezoneOffset() - t1.getTimezoneOffset() ) * 60000
								))) / 6048e5 ) + 1;
						case 1:
							t1 = this.copy([0,-1*this.getMonth()]).setFirstDay(1);
							return Math.floor(
								( this.getTime() - ( t1.getTime() + (
									( this.getTimezoneOffset() - t1.getTimezoneOffset() ) * 60000
								))) / 6048e5 ) + 1;
						case 4:
							// this line is some bullshit.  but it does work.
							// (trap for dec 29, 30, or 31st being in the new year's week - these
							// are the only 3 that can possibly fall like this)
							if ( this.getMonth() === 11 && this.getDate() > 28 ) { return 1; }

							t1 = this.copy([0,-1*this.getMonth()],true).setFirstDay(4).adj(2,-3);
							t2 = Math.floor(
								( this.getTime() - ( t1.getTime() + (
									( this.getTimezoneOffset() - t1.getTimezoneOffset() ) * 60000
								))) / 6048e5 ) + 1;

							if ( t2 < 1 ) {
								t1 = this.copy([-1,-1*this.getMonth()]).setFirstDay(4).adj(2,-3);
								return Math.floor((this.getTime() - t1.getTime()) / 6048e5) + 1;
							}
							return t2;
						default:
							return 0;
					}
				}
			});
		},
		_event: function(e, p) {
			var tmp,
				w = $( this ).data( "mobile-datebox" );
			if ( ! e.isPropagationStopped() ) {
				switch (p.method) {
					case "close":
						w.close();
						break;
					case "open":
						w.open(); break;
					case "set":
						if ( typeof p.value === "object" ) {
							w.theDate = p.value;
							w._t( { method: "doset" } );
						} else {
							$( this ).val( p.value );
							$( this ).trigger( "change" );
						}
						break;
					case "doset":
						tmp = "_" + w.options.mode + "DoSet";
						if ( $.isFunction( w[ tmp ] ) ) {
							w[ tmp ].apply( w, [] );
						} else {
							w._t( { 
								method: "set",
								value: w._formatter( w.__fmt(), w.theDate ),
								date: w.theDate
							} );
						}
						break;
					case "dooffset":
						if ( p.type ) { 
							w._offset( p.type, p.amount, true );
						} 
						break;
					case "dorefresh":
						w.refresh();
						break;
					case "doclear":
						$( this ).val( "" ).trigger( "change" );
						break;
					case "clear":
						$( this ).trigger( "change" );
						break;
				}
			}
		},
		_ord: {
			"default": function (num) {
				// Return an ordinal suffix (1st, 2nd, 3rd, etc)
				var ending = num % 10;
				if ( ( num > 9 && num < 21 ) || ending > 3 ) { return "th"; }
				return [ "th", "st", "nd", "rd" ][ ending ];
			}
		},
		_dur: function(ms) {
			var dur = [
					ms / ( 60*60*1000*24 ),
					ms / ( 60*60*1000) % 24,
					ms / ( 60*1000) % 60,
					ms / ( 1000 ) % 60,
				];
			$.each(dur, function(a,b){
				dur[a] = parseInt(b, 10);
			});
			return dur;
		},
		_gridblk: {
			g: [0, 0, "a", "b", "c", "d", "e"],
			b: ["a", "b", "c", "d", "e", "f"]
		},
		__ : function(val) {
			var o = this.options,
				lang = o.lang[o.useLang],
				mode = o[ o.mode + "lang"],
				oride = "override" + val.charAt(0).toUpperCase() + val.slice(1);

			if ( typeof o[ oride ] !== "undefined" ) {
				return o[ oride ]; 
			}
			if ( typeof lang[ val ] !== "undefined" ) {
				return lang[ val ];
			}
			if ( ( typeof mode !== "undefined" ) && ( typeof mode[ val ] !== "undefined" ) ) { 
				return mode[ val ]; 
			}
			return o.lang[ "default" ][ val ];
		},
		__fmt: function() {
			var w = this,
				o = this.options;

			if ( typeof w.fmtOver !== "undefined" && w.fmtOver !== false ) {
				return w.fmtOver;
			}
			
			switch ( o.mode ) {
				case "timebox":
				case "timeflipbox":
					return w.__( "timeOutput" );
				case "durationbox":
				case "durationflipbox":
					return w.__( "durationFormat" );
				default:
					return w.__( "dateFormat" );
			}
		},
		_zPad: function(number, pad) {
			// Zero pad a number.
			if ( typeof pad !== "undefined" && pad === "-" ) { return String(number); }
			return ( number < 10  ? "0" : "" ) + String( number );
		},
		_dRep: function( oper, direction ) {
			// Digit replacement Indic/Arabic
			var ch, i, 
				start = 48,
				end = 57,
				adder = 1584,
				newd = "";

			if ( direction === -1 ) {
				start += adder;
				end += adder;
				adder = -1584;
			}
			for ( i = 0; i < oper.length; i++ ) {
				ch = oper.charCodeAt( i );
				if ( ch >= start && ch <= end ) {
					newd = newd + String.fromCharCode( ch+adder );
				} else {
					newd = newd + String.fromCharCode( ch );
				}
			}
			return newd;
		},
		_doIndic: function() {
			var w = this;

			w.d.intHTML.find( "*" ).each( function() {
				if ( $( this ).children().length < 1 ) {
					$( this ).text( w._dRep( $( this ).text() ) );
				} else if ( $( this ).hasClass( "ui-datebox-slideday" ) ) {
					$( this ).html( w._dRep( $( this ).html() ) );
				}
			});
			w.d.intHTML.find( "input" ).each(function() {
				$( this ).val( w._dRep( $( this ).val() ) );
			});
		},
		_parser: {
			// Custom Parser Definitions.
			"default": function () { return false; } // Arguments is STR
		},
		_n: function ( val, def ) {
			// Don't allow negative values, use a default instead
			return ( val < 0 ) ? def : val;
		},
		_pa: function (arr,date) {
			// "Clean" a date for use.
			if ( typeof date === "boolean" ) { 
				return new this._date( arr[0], arr[1], arr[2], 0, 0, 0, 0 );
			}
			return new this._date( 
				date.get(0),
				date.get(1),
				date.get(2),
				arr[0],
				arr[1],
				arr[2],
				0
			);
		},
		_makeDate: function ( str ) {
			// Date Parser
			var i,  exp_temp, exp_format, grbg,
				w = this,
				o = this.options,
				defVal = this.options.defaultValue,
				adv = w.__fmt(),
				exp_input = null,
				exp_names = [],
				date = new w._date(),
				d = { 
					year: -1,
					mont: -1,
					date: -1,
					hour: -1,
					mins: -1,
					secs: -1,
					week: false,
					wtyp: 4,
					wday: false,
					yday: false,
					meri: 0
				};
				
			str = $.trim( ( ( w.__( "useArabicIndic" ) === true ) ? 
					w._dRep( str, -1 ) : 
					str 
				) );

			if ( typeof o.mode === "undefined" ) { return date; }
			if ( typeof w._parser[ o.mode ] !== "undefined" ) { 
				return w._parser[ o.mode ].apply( w, [ str ] ); 
			}

			if ( o.mode === "durationbox" || o.mode === "durationflipbox" ) {
				adv = adv.replace(/%D([a-z])/gi, function( match, oper ) {
					switch ( oper ) {
						case "d":
						case "l":
						case "M":
						case "S": return "(" + match + "|[0-9]+)";
						default: return ".+?";
					}
				});

				adv = new RegExp( "^" + adv + "$" );
				exp_input = adv.exec(str);
				exp_format = adv.exec(w.__fmt());

				if ( exp_input === null || exp_input.length !== exp_format.length ) {
					if ( typeof defVal === "number" && defVal > 0 ) {
						// defaultValue is an integer
						return new w._date(
							( w.initDate.getEpoch() + parseInt( defVal,10 ) ) * 1000
						);
					}
					// No default, use ZERO.
					return new w._date( w.initDate.getTime() );
				}

				exp_temp = w.initDate.getEpoch();
				for ( i=1; i<exp_input.length; i++ ) {
					grbg = parseInt( exp_input[i], 10);

					if ( exp_format[i].match( /^%Dd$/i ) ) { 
						exp_temp = exp_temp + ( grbg * 86400 );
					}
					if ( exp_format[i].match( /^%Dl$/i ) ) { 
						exp_temp = exp_temp + ( grbg * 3600 );
					}
					if ( exp_format[i].match( /^%DM$/i ) ) { 
						exp_temp = exp_temp + ( grbg * 60 );
					}
					if ( exp_format[i].match( /^%DS$/i ) ) { 
						exp_temp = exp_temp + ( grbg ); 
					}
				}
				return new w._date( exp_temp * 1000 );
			}

			adv = adv.replace( /%(0|-)*([a-z])/gi, function( match, pad, oper ) {
				exp_names.push( oper );
				switch ( oper ) {
					case "p":
					case "P":
					case "b":
					case "B": return "(" + match + "|.+?)";
					case "H":
					case "k":
					case "I":
					case "l":
					case "m":
					case "M":
					case "S":
					case "V":
					case "U":
					case "u":
					case "W":
					case "d": 
						return "(" + match + "|[0-9]{" + 
							(( pad === "-" ) ? "1," : "" ) + "2})";
					case "j": return "(" + match + "|[0-9]{3})";
					case "s": return "(" + match + "|[0-9]+)";
					case "g":
					case "y": return "(" + match + "|[0-9]{2})";
					case "E":
					case "G":
					case "Y": return "(" + match + "|[0-9]{1,4})";
					default: exp_names.pop(); return ".+?";
				}
			});

			adv = new RegExp( "^" + adv + "$" );
			exp_input = adv.exec(str);
			exp_format = adv.exec(w.__fmt());

			if ( exp_input === null || exp_input.length !== exp_format.length ) {
				if ( defVal !== false ) {
					switch ( typeof defVal ) {
						case "object":
							if ( $.isFunction( defVal.getDay ) ) {
								date = defVal;
							} else {
								if ( defVal.length === 3 ) {
									date =  w._pa(
										defVal,
										( o.mode.substr(0,4) === "time" ? date : false )
									);
								}
							} 
							break;
						case "number":
							date =  new w._date( defVal * 1000 ); break;
						case "string":
							if ( o.mode.substr(0,4) === "time" ) {
								exp_temp = $.extend(
										[0,0,0],
										defVal.split( ":" )
									).slice( 0, 3 );
								date = w._pa( exp_temp, date ); 
							} else {
								exp_temp = $.extend( 
										[0,0,0],
										defVal.split( "-" )
									).slice( 0, 3 );
								exp_temp[1]--;
								date = w._pa( exp_temp, false ); 
							} break;
					}
				}
				if ( isNaN(date.getDate()) ) { date = new w._date(); }
			} else {
				for ( i=1; i<exp_input.length; i++ ) {
					grbg = parseInt( exp_input[i], 10);
					switch ( exp_names[i-1] ) {
						case "s": return new w._date( parseInt( exp_input[i], 10 ) * 1000 );
						case "Y":
						case "G": d.year = grbg; break;
						case "E": d.year = grbg - 543; break;
						case "y":
						case "g":
							if ( o.afterToday || grbg < 38 ) {
								d.year = 2000 + grbg;
							} else {
								d.year = 1900 + grbg;
							} break;
						case "m": d.mont = grbg - 1; break;
						case "d": d.date = grbg; break;
						case "H":
						case "k":
						case "I":
						case "l": d.hour = grbg; break;
						case "M": d.mins = grbg; break;
						case "S": d.secs = grbg; break;
						case "u": d.wday = grbg - 1; break;
						case "w": d.wday = grbg; break;
						case "j": d.yday = grbg; break;
						case "V": d.week = grbg; d.wtyp = 4; break;
						case "U": d.week = grbg; d.wtyp = 0; break;
						case "W": d.week = grbg; d.wtyp = 1; break;
						case "p":
						case "P": 
							grbg = new RegExp("^" + exp_input[i] + "$", "i");
							d.meri = ( grbg.test( w.__( "meridiem" )[0] ) ? -1 : 1 );
							break;
						case "b":
							exp_temp = $.inArray( exp_input[i], w.__( "monthsOfYearShort" ) );
							if ( exp_temp > -1 ) { d.mont = exp_temp; }
							break;
						case "B":
							exp_temp = $.inArray( exp_input[i], w.__( "monthsOfYear" ) );
							if ( exp_temp > -1 ) { d.mont = exp_temp; }
							break;
					}
				}
				if ( d.meri !== 0 ) {
					if ( d.meri === -1 && d.hour === 12 ) { d.hour = 0; }
					if ( d.meri === 1 && d.hour !== 12 ) { d.hour = d.hour + 12; }
				}

				date = new w._date(
					w._n( d.year, 0 ),
					w._n( d.mont, 0 ),
					w._n( d.date, 1 ),
					w._n( d.hour, 0 ),
					w._n( d.mins, 0 ),
					w._n( d.secs, 0 ),
					0
				);

				if ( d.year < 100 && d.year !== -1 ) { date.setFullYear(d.year); }

				if ( ( d.mont > -1 && d.date > -1 ) ||
						( d.hour > -1 && d.mins > -1 && d.secs > -1 ) ) {
					return date;
				}

				if ( d.week !== false ) {
					date.setDWeek( d.wtyp, d.week );
					if ( d.date > -1 ) { date.setDate( d.date ); }
				}
				if ( d.yday !== false ) { 
					date.setD( 1, 0 ).setD( 2, 1 ).adj( 2, ( d.yday - 1 ) );
				}
				if ( d.wday !== false ) { 
					date.adj( 2 , ( d.wday - date.getDay() ) );
				}
			}
			return date;
		},
		_customformat: {
			"default": function() { return false; } // Arguments are OPER, DATE
		},
		_formatter: function(format, date) {
			var w = this,
				o = this.options, tmp,
				dur = 0;

				if ( o.mode.substr( 0, 4 ) === "dura" ) {
					dur = w._dur(this.theDate.getTime() - this.initDate.getTime());

					if ( ! format.match( /%Dd/ ) ) { dur[1] += (dur[0]*24);}
					if ( ! format.match( /%Dl/ ) ) { dur[2] += (dur[1]*60);}
					if ( ! format.match( /%DM/ ) ) { dur[3] += (dur[2]*60);}
				}

			format = format.replace(/%(D|X|0|-)*([1-9a-zA-Z])/g, function(match, pad, oper) {
				if ( pad === "X" ) {
					if ( typeof w._customformat[o.mode] !== "undefined" ) { 
						return w._customformat[o.mode](oper, date, o);
					}
					return match;
				}
				if ( pad === "D" ) {
					switch ( oper ) {
						case "d": return dur[0];
						case "l": return w._zPad(dur[1]);
						case "M": return w._zPad(dur[2]);
						case "S": return w._zPad(dur[3]);
						case "A": return w.__( "durationDays" )[ (( dur[0] === 1 ) ? 0 : 1 ) ];
						default: return match;
					}
				}
				switch ( oper ) {
					case "a": // Short Day
						return w.__( "daysOfWeekShort" )[ date.getDay() ];
					case "A": // Full Day of week
						return w.__( "daysOfWeek" )[ date.getDay() ];
					case "b": // Short month
						return w.__( "monthsOfYearShort" )[ date.getMonth() ];
					case "B": // Full month
						return w.__( "monthsOfYear" )[ date.getMonth() ];
					case "C": // Century
						return parseInt(date.getFullYear() / 100);
					case "d": // Day of month
						return w._zPad( date.getDate(), pad );
					case "H": // Hour (01..23)
					case "k":
						return w._zPad( date.getHours(), pad );
					case "I": // Hour (01..12)
					case "l":
						return w._zPad( date.get12hr(), pad );
					case "m": // Month
						return w._zPad( date.getMonth()+1, pad );
					case "M": // Minutes
						return w._zPad( date.getMinutes(), pad );
					case "p": // AM/PM (ucase)
					case "P": // AM/PM (lcase)
						tmp = w.__( "meridiem" )[ ( ( date.get(3) < 12 ) ? 0 : 1 ) ].toUpperCase();
						return ( oper === "P" ? tmp.toLowerCase() : tmp );
					case "s": // Unix Seconds
						return date.getEpoch();
					case "S": // Seconds
						return w._zPad( date.getSeconds(), pad );
					case "u": // Day of week (1-7)
						return w._zPad( date.getDay() + 1, pad );
					case "w": // Day of week
						return date.getDay();
					case "y": // Year (2 digit)
						return w._zPad(date.getFullYear() % 100);
					case "Y": // Year (4 digit)
						return date.getFullYear();
					case "E": // BE (Buddist Era, 4 Digit)
						return date.getFullYear() + 543;
					case "V":
						return w._zPad( date.getDWeek(4), pad );
					case "U":
						return w._zPad( date.getDWeek(0), pad );
					case "W":
						return w._zPad( date.getDWeek(1), pad );
					case "o": // Ordinals
						if ( typeof w._ord[o.useLang] !== "undefined" ) {
							return w._ord[ o.useLang ]( date.getDate() );
						}
						return w._ord[ "default" ](date.getDate());
					case "j":
						tmp = new Date(date.getFullYear(),0,1);
						tmp = "000" + String(Math.ceil((date - tmp) / 86400000)+1);
						return tmp.slice(-3);
					case "G":
						tmp = date.getFullYear();
						if ( date.getDWeek(4) === 1 && date.getMonth() > 0 ) {
							return tmp + 1;
						}
						if ( date.getDWeek(4) > 51 && date.getMonth() < 11 ) {
							return tmp - 1;
						}
						return tmp;
					case "g":
						tmp = date.getFullYear % 100;
						if ( date.getDWeek(4) === 1 && date.getMonth() > 0 ) {
							++tmp;
						}
						if ( date.getDWeek(4) > 51 && date.getMonth() < 11 ) {
							--tmp;
						}
						return w._zpad(tmp);
					default:
						return match;
				}
			});

			if ( w.__( "useArabicIndic" ) === true ) {
				format = w._dRep(format);
			}

			return format;
		},
		_btwn: function(value, low, high) {
			return ( value > low && value < high );
		},
		_minStepFix: function() {
			// Round "extra" minutes when using a stepper.
			var newMinute = this.theDate.get(4), 
				mstep = this.options.minuteStep,
				roundDirection = this.options.minStepRound,
				remainder = newMinute % mstep;

			if ( mstep > 1 && remainder > 0 ) {
				if ( roundDirection < 0 ) {
					newMinute = newMinute - remainder;
				} else if ( roundDirection > 0 ) {
					newMinute = newMinute + ( mstep - remainder );
				} else {
					if ( newMinute % mstep < mstep / 2 ) {
						newMinute = newMinute - remainder;
					} else {
						newMinute = newMinute + ( mstep - remainder );
					}
				}
			this.theDate.setMinutes(newMinute);
			}
		},
		_offset: function(mode, amount, update) {
			// Compute a date/time offset.
			//   update = false to prevent controls refresh
			var w = this,
				o = this.options,
				now = this.theDate,
				ok = false;

			mode = ( mode || "" ).toLowerCase();

			if ( typeof update === "undefined" ) { update = true; }

			if ( mode !== "a" && 
					( typeof o.rolloverMode[mode] === "undefined" || o.rolloverMode[mode] === true )
				) {
				ok = $.inArray(mode, [ "y", "m", "d", "h", "i", "s" ]);
			} else {
				switch(mode) {
					case "y": ok = 0; break;
					case "m":
						if ( w._btwn( now.get(1) + amount, -1, 12 ) ) { ok = 1; }
						break;
					case "d":
						if ( w._btwn( 
								now.get(2) + amount, 
								0, 
								( 32 - now.copy( [0], [0,0,32,13] ).get(3) + 1 ) 
							)) { ok = 2; }
						break;
					case "h":
						if ( w._btwn( now.get(3) + amount, -1, 24 ) ) { ok = 3; }
						break;
					case "i":
						if ( w._btwn( now.get(4) + amount, -1, 60 ) ) { ok = 4; }
						break;
					case "s":
						if ( w._btwn( now.get(5) + amount, -1, 60 ) ) { ok = 5; }
						break;
					case "a":
						w._offset( "h", ( ( amount > 0 ) ? 1 : -1 ) * 12, false );
						break;
				}
			}
			if ( ok !== false ) { w.theDate.adj( ok, amount ); }
			if ( update === true ) { w.refresh(); }
			if ( o.useImmediate ) { w._t( { method: "doset" } ); }

			w._t( {
				method: "offset",
				type: mode,
				amount: amount,
				newDate: w.theDate
			} );
		},
		_startOffset: function(date) {
			var o = this.options;

			if ( o.startOffsetYears !== false ) {
				date.adj( 0, o.startOffsetYears );
			}
			if ( o.startOffsetMonths !== false ) {
				date.adj( 1, o.startOffsetMonths );
			}
			if ( o.startOffsetDays !== false ) {
				date.adj( 2, o.startOffsetDays );
			}
			return date;
		},
		_destroy: function() {
			var w = this,
				o = this.options,
				button = this.d.wrap.find( "a" );

			w.d.wrap.removeClass( "ui-input-has-clear" );
			button.remove();

			if ( o.lockInput ) {
				w.d.input.removeAttr( "readonly" );
			}

			w.d.input
				.off( "datebox" )
				.off( "focus.datebox" )
				.off( "blur.datebox" )
				.off( "change.datebox" );
				
			$( document )
				.off( w.drag.eMove )
				.off( w.drag.eEnd )
				.off( w.drag.eEndA );
		},
		_create: function() {
			// Create the widget, called automatically by widget system
			$( document ).trigger( "dateboxcreate" );

			var w = this,
				o = $.extend(
					this.options,
					this._getLongOptions( this.element ),
					this.element.data( "options" )
				),
				thisTheme = ( ( o.theme === false ) ?
					$.mobile.getInheritedTheme( this.element ) :
					o.theme
				),
				trans = o.useAnimation ? o.transition : "none",
				d = {
					input: this.element,
					wrap: this.element.parent(),
					mainWrap: $( "<div>", { 
						"class": "ui-datebox-container ui-overlay-shadow " + 
							"ui-corner-all ui-datebox-hidden " + trans +
							" ui-body-" + thisTheme
						} ).css( "zIndex", o.zindex ),
					intHTML: false
				},
				evtid = ".datebox" + this.uuid,
				touch = ( typeof window.ontouchstart !== "undefined" ),
				drag = {
					eStart : (touch ? "touchstart" : "mousedown" ) + evtid,
					eMove  : (touch ? "touchmove" : "mousemove" ) + evtid,
					eEnd   : (touch ? "touchend" : "mouseup" ) + evtid,
					eEndA  : (touch ?
						(["mouseup","touchend","touchcanel","touchmove"].join(evtid+" ") + evtid) :
						"mouseup" + evtid
					),
					move   : false,
					start  : false,
					end    : false,
					pos    : false,
					target : false,
					delta  : false,
					tmp    : false
				};

			$.extend(w, {d: d, drag: drag, touch:touch});

			if ( o.usePlaceholder !== false ) {
				if ( o.usePlaceholder === true && w._grabLabel() !== "" ) { 
					w.d.input.attr( "placeholder", w._grabLabel());
				}
				if ( typeof o.usePlaceholder === "string" ) {
					w.d.input.attr( "placeholder", o.usePlaceholder );
				}
			}

			o.theme = thisTheme;

			w.disabled = false;
			w.runButton = false;
			w._date = window.Date;
			w._enhanceDate();
			w.baseID = w.d.input.attr( "id" );

			w.initDate = new w._date();
			w.initDate.setMilliseconds(0);
			w.theDate = ( o.defaultValue ) ?
				w._makeDate() :
				( (w.d.input.val() !== "" ) ?
					w._makeDate( w.d.input.val() ) :
					new w._date() );

			if ( w.d.input.val() === "" ) { w._startOffset( w.theDate ); }

			w.initDone = false;

			if ( o.showInitialValue ) {
				w.d.input.val( w._formatter( w.__fmt(), w.theDate ) );
			}

			if ( o.useButton ) {
				if ( o.mode !== false ) {
					w.d.wrap.addClass( "ui-input-has-clear" );
					if ( o.buttonIcon === false ) {
						if ( o.mode.substr( 0, 4 ) === "time" || o.mode.substr( 0 ,3 ) === "dur" ) {
							o.buttonIcon = o.buttonIconTime;
						} else {
							o.buttonIcon = o.buttonIconDate;
						}
					}
					$( "<a href='#' class='ui-input-clear ui-btn ui-icon-" + 
							o.buttonIcon +
							" ui-btn-icon-notext ui-corner-all'></a>" )
						.attr( "title", w.__( "tooltip" ) )
						.text( w.__( "tooltip" ) )
						.appendTo(w.d.wrap)
						.on(o.clickEvent, function( e ) {
							e.preventDefault();
							if ( o.useFocus ) {
								w.d.input.focus();
							} else {
								if ( !w.disabled ) { w._t( { method: "open" } ); }
							}
						});
				}
			}

			if ( o.hideInput ) { w.d.wrap.hide(); }
			if ( o.hideContainer ) { w.d.wrap.parent().hide(); }

			w.d.input
				.on( "focus.datebox", function(){
					w.d.input.addClass( "ui-focus" );
					if ( w.disabled === false && o.useFocus ) {
						w._t( { method: "open" } );
					}
				})
				.on( "blur.datebox", function() { 
					w.d.input.removeClass( "ui-focus" ); 
				})
				.on( "change.datebox", function() {
					w.theDate = w._makeDate( w.d.input.val() );
					w.refresh();
				})
				.on( "datebox", w._event );

			if ( o.lockInput ) { 
				w.d.input.attr( "readonly", "readonly" ); 
			}

			// Check if mousewheel plugin is loaded
			if ( typeof $.event.special.mousewheel !== "undefined" ) {
				w.wheelExists = true;
			}

			// Disable when done if element attribute disabled is true.
			if ( w.d.input.is( ":disabled" ) ) {
				w.disable();
			}

			w.applyMinMax(false, false);

			if ( o.useInline || o.useInlineBlind ) {
				w.open();
			}

			//Throw dateboxinit event
			$( document ).trigger( "dateboxaftercreate" );
		},
		applyMinMax: function( refresh, override ) {
			// PUBLIC function to apply min/max attributes
			var todayClean, fromEl, fromElDate, daysRaw,
				w = this,
				o = this.options,
				today = new this._date(),
				lod = 24 * 60 * 60 * 1000;

			todayClean = w._pa([0,0,0], today);
			
			if ( typeof refresh === "undefined" ) { refresh = true; }
			if ( typeof override === "undefined" ) { override = true; }

			if ( ( override === true || o.minDays === false ) && 
					( typeof w.d.input.attr( "min" ) !== "undefined" ) ) {

				fromEl =  w.d.input.attr( "min" ).split( "-" );
				fromElDate = new w._date(fromEl[0], fromEl[1]-1, fromEl[2], 0, 0, 0, 0 );
				daysRaw = ( fromElDate.getTime() - todayClean.getTime() ) / lod;
				o.minDays = parseInt( daysRaw * -1 , 10 ) + 1;
			}
			if ( ( override === true || o.maxDays === false ) && 
					( typeof w.d.input.attr( "max" ) !== "undefined" ) ) {

				fromEl = w.d.input.attr( "max" ).split( "-" );
				fromElDate = new w._date(fromEl[0], fromEl[1]-1, fromEl[2], 0, 0, 0, 0 );
				daysRaw = ( fromElDate.getTime() - todayClean.getTime() ) / lod;
				o.maxDays = parseInt( daysRaw, 10 ) - 1;
			}

			if ( refresh === true ) { 
				w._t( { method: "refresh" } );
			}
		},
		_build: {
			"default": function () {
				this.d.headerText = "Error";
				if ( this.d.intHTML !== false ) {
					this.d.intHTML.remove().empty();
				}
				this.d.intHTML = $("<div class='ui-body-b'><h2 style='text-align:center'>" + 
					"Unknown Mode</h2></div>" );
			}
		},
		_drag: {
			"default": function () { return false; }
		},
		open: function () {
			// PUBLIC function to open the control
			var w = this,
				o = this.options,
				popopts = {
					transition: (o.useAnimation ? o.transition : "none" )
				},
				basepop = { 
					history: false,
					transition: (o.useAnimation ? o.transition : "none" )
				};

			if ( o.useFocus && w.fastReopen === true ) { 
				w.d.input.blur();
				return false;
			}

			w.theDate = w._makeDate( w.d.input.val() );
			if ( w.d.input.val() === "" ) { w._startOffset( w.theDate ); }
			w.d.input.blur();

			if ( typeof w._build[ o.mode ] === "undefined" ) {
				w._build[ "default" ].apply( w, [] );
			} else {
				w._build[ o.mode ].apply( w, [] );
			}
			if ( typeof w._drag[ o.mode ] !== "undefined" ) {
				w._drag[ o.mode ].apply( w, [] );
			}

			w._t( { method: "refresh" } );

			if ( w.__( "useArabicIndic" ) === true ) { w._doIndic(); }

			if ( ( o.useInline || o.useInlineBlind ) && w.initDone === false ) {
				w.d.mainWrap.append( w.d.intHTML );
				
				if ( o.hideContainer ) {
					if ( o.useHeader ) {
						w.d.mainWrap.prepend( $( "<div class='ui-header ui-bar-" + o.themeHeader +
							"'>" + "<h1 class='ui-title'>" + w.d.headerText + "</h1>" + "</div>" )
						);
					}
					w.d.wrap.parent().after( w.d.mainWrap );
				} else {
					w.d.wrap.parent().append( w.d.mainWrap );
				}
				w.d.mainWrap.removeClass( "ui-datebox-hidden ui-overlay-shadow" );
				if ( o.useInline ) {
					w.d.mainWrap.addClass( "ui-datebox-inline" );
					if ( !o.hideInput && !o.hideContainer ) {
						w.d.mainWrap.addClass("ui-datebox-inline-has-input");
					} 
					// This is really hacky.  I hate it, but I don't have a 
					// better idea right now.  Cleans up position on flip variants.
					setTimeout( (function(w) { 
						return function() {
							w._t( { method: "postrefresh" } );
						};
					}(w)), 100);
					return true;
				} else {
					w.d.mainWrap.addClass( "ui-datebox-inline ui-datebox-inline-has-input" );
					w.d.mainWrap.hide();
				}
				w.initDone = false;
				w._t( { method: "postrefresh" } );
			}

			if ( o.useInlineBlind ) {
				if ( w.initDone ) { 
					w.refresh();
					w.d.mainWrap.slideDown();
					w._t( { method: "postrefresh" } );
				} else { 
					w.initDone = true; 
				}
				return true;
			}

			// Ignore if already open
			if ( w.d.intHTML.is( ":visible" ) ) { return false; }

			w.d.mainWrap.empty();

			if ( o.useHeader ) {
				w.d.mainWrap.append( $( "<a href='#'>Close</a>" )
					.addClass( "ui-btn-left ui-link ui-btn ui-btn-a ui-icon-delete " + 
						"ui-btn-icon-notext ui-shadow ui-corner-all"
					)
					.on( o.clickEventAlt, function( e ) {
						e.preventDefault();
						w._t( { method: "close" } );
					} )
				);
				w.d.mainWrap.append( $( "<div class='ui-header ui-bar-" + o.themeHeader + "'>" + 
					"<h1 class='ui-title'>" + w.d.headerText + "</h1>" +
					"</div>" )
				);
			}
			
			w.d.mainWrap.append( w.d.intHTML ).css( "zIndex", o.zindex );
			w._t( { method: "postrefresh" } );

			if ( o.popupPosition !== false ) {
				popopts.positionTo = o.popupPosition;
			} else {
				if ( typeof w.baseID !== "undefined" ) {
					popopts.positionTo = "#" + w.baseID;
				} else {
					popopts.positionTo = "window";
				}
			}

			if ( o.popupForceX !== false && o.popupForceY !== false ) {
				popopts.x = parseInt(o.popupForceX,10);
				popopts.y = parseInt(o.popupForceY,10);
				popopts.positionTo = "origin";
			}

			if ( o.useModal ) {
				basepop.overlayTheme = o.useModalTheme;
				basepop.dismissible = false;
			}

			// Perpare open callback, if provided. Additionally, if this
			// returns false then the open/update will stop.
			if ( o.openCallback !== false ) {
				if ( ! $.isFunction( o.openCallback ) ) {
					if ( typeof window[ o.openCallback ] === "function" ) {
						o.openCallback = window[ o.openCallback ];
					}
				}
				basepop.afteropen = function() {
					w._t( { method: "postrefresh" } );
					if ( o.openCallback.apply( w, $.merge([{
								custom: w.customCurrent,
								initDate: w.initDate,
								date: w.theDate,
								duration: w.lastDuration
							}], o.openCallbackArgs ) ) === false ) {

						w._t( {method: "close"} );
					}
				};
			} else {
				basepop.afteropen = function() {
					w._t( { method: "postrefresh" } );
				};
			}
			// Prepare close callback.
			if ( o.closeCallback !== false ) {
				if ( ! $.isFunction( o.closeCallback ) ) {
					if ( typeof window[ o.closeCallback ] === "function" ) {
						o.closeCallback = window[ o.closeCallback ];
					}
				}
				basepop.afterclose = function() {
					o.closeCallback.apply( w, $.merge([{
						custom: w.customCurrent,
						initDate: w.initDate,
						date: w.theDate,
						duration: w.lastDuration
					}], o.closeCallbackArgs ) );
				};
			}

			w.d.mainWrap
				.removeClass( "ui-datebox-hidden" )
				.popup( basepop )
				.popup( "open", popopts );
		},
		close: function() {
			// Provide a PUBLIC function to close the element.
			var w = this,
				o = this.options;

			if ( o.useInlineBlind ) { 
				// Slide up useInlineBlind
				w.d.mainWrap.slideUp();
				return true;
			}
			if ( o.useInline || w.d.intHTML === false ) { 
				// Do nothing for useInline or empty.
				return true;
			}

			// Trigger the popup to close
			w.d.mainWrap.popup( "close" );

			// Unbind all drag handlers.
			$( document )
				.off( w.drag.eMove )
				.off( w.drag.eEnd )
				.off( w.drag.eEndA );

			if ( o.useFocus ) {
				w.fastReopen = true;
				setTimeout( (function( t ) { 
					return function () { 
						t.fastReopen = false; 
					};
				}( w )), 300 );
			}
		},
		refresh: function() {
			// Provide a PUBLIC function to Refresh the element
			var w = this,
				o = this.options;
			
			if ( typeof w._build[ o.mode ] === "undefined" ) {
				w._build[ "default" ].apply( w, [] );
			} else {
				w._build[ o.mode ].apply( w, [] );
			}
			if ( w.__( "useArabicIndic" ) === true ) { 
				w._doIndic(); 
			}
			w.d.mainWrap.append( w.d.intHTML );
			w._t( {method: "postrefresh"});
		},
		_check: function() {
			// Check to see if a date is valid.
			var td, year, month, date, i,
				w = this,
				o = this.options,
				now = this.theDate;

			w.dateOK = true;
			if ( typeof o.mode === "undefined") { return true; }

			if ( o.afterToday ) {
				td = new w._date();
				if ( now < td ) { now = td; }
			}
			if ( o.beforeToday ) {
				td = new w._date();
				if ( now > td ) { now = td; }
			}
			if ( o.maxDays !== false ) {
				td = new w._date();
				td.adj( 2, o.maxDays );
				if ( now > td ) { now = td; }
			}
			if ( o.minDays !== false ) {
				td = new w._date();
				td.adj( 2, -1 * o.minDays );
				if ( now < td ) { now = td; }
			}
			if ( o.minHour !== false ) {
				if ( now.get(3) < o.minHour ) {
					now.setD( 3, o.minHour );
				}
			}
			if ( o.maxHour !== false ) {
				if ( now.get(3) > o.maxHour ) {
					now.setD( 3, o.maxHour );
				}
			}
			if ( o.maxYear !== false ) {
				td = new w._date( o.maxYear, 11, 31 );
				if ( now > td ) { now = td; }
			}
			if ( o.minYear !== false ) {
				td = new w._date( o.minYear, 0, 1 );
				if ( now < td ) { now = td; }
			}

			if ( o.mode.substr(0,4) === "time" || o.mode.substr(0,3) === "dur" ) {
				if ( o.mode === "timeflipbox" && o.validHours !== false ) {
					if ( $.inArray( now.get(3), o.validHours ) < 0 ) { w.dateOK = false; }
				}
			} else {
				if ( o.blackDatesRec !== false ) {
					year = now.get(0);
					month = now.get(1);
					date = now.get(2);

					for ( i=0; i<o.blackDatesRec.length; i++ ) {
						if (
							( o.blackDatesRec[i][0] === -1 || o.blackDatesRec[i][0] === year ) &&
							( o.blackDatesRec[i][1] === -1 || o.blackDatesRec[i][1] === month ) &&
							( o.blackDatesRec[i][2] === -1 || o.blackDatesRec[i][2] === date )
						) { w.dateOK = false; }
					}
				}
				if ( o.blackDates !== false ) {
					if ( $.inArray( now.iso(), o.blackDates ) > -1 ) { 
						w.dateOK = false; 
					}
				}
				if ( o.blackDays !== false ) {
					if ( $.inArray( now.getDay(), o.blackDays ) > -1 ) { 
						w.dateOK = false; 
					}
				}
				if ( o.whiteDates !== false ) {
					if ( $.inArray( now.iso(), o.whiteDates ) > -1 ) { 
						w.dateOK = true; 
					}
				}
			}
			w.theDate = now;
		},
		_grabLabel: function() {
			// Get the most reasonable label for this datebox.
			// In order of preference - placeholder, title, label for=
			var inputPlaceholder, inputTitle,
				w = this,
				o = this.options,
				tmp = false;

			if ( typeof o.overrideDialogLabel === "undefined" ) {
				inputPlaceholder = w.d.input.attr( "placeholder" );
				inputTitle = w.d.input.attr( "title" );
				
				if ( typeof inputPlaceholder !== "undefined" ) {
					return inputPlaceholder;
				}
				if ( typeof inputTitle !== "undefined" ) {
					return inputTitle;
				}
				tmp = $(document).find( "label[for='" + w.d.input.attr( "id" ) + "']" ).text();
				return ( tmp === "" ) ? false : tmp;
			}
			return o.overrideDialogLabel;
		},
		_stdBtn: {
			clear: function() {
				var w = this, o = this.options;
				return $( "<a href='#' role='button'>" + w.__( "clearButton" ) + "</a>" )
					.addClass( 
						"ui-btn ui-btn-" + o.theme +
						" ui-icon-delete ui-btn-icon-left ui-shadow ui-corner-all"
					)
					.on(o.clickEventAlt, function(e) {
						e.preventDefault();
						w.d.input.val("");
						w._t( { method: "clear" } );
						w._t( { method: "close" } );
					});
			},
			close: function(txt) {
				var w = this, o = this.options;
				return $( "<a href='#' role='button'>" + txt + "</a>" )
					.addClass( "ui-btn ui-btn-" + o.theme + 
						" ui-icon-check ui-btn-icon-left ui-shadow ui-corner-all" +
						( ( w.dateOK === true ) ? "" : " ui-state-disabled" )
					)
					.on(o.clickEventAlt, function(e) {
						e.preventDefault();
						if ( w.dateOK === true ) {
							w._t( { 
								method: "set", 
								value: w._formatter(w.__fmt(),w.theDate),
								date: w.theDate
							} );
							w._t( { method: "close" } );
						}
						
					});
			}
		},
		_makeEl: function( source, parts ) {
			// Populate a source element with data parts.
			var part = false,
				retty = false;

			retty = source.clone();

			if ( typeof parts.attr !== "undefined" ) {
				for ( part in parts.attr ) {
					if ( parts.attr.hasOwnProperty(part) ) {
						retty.data(part, parts.attr[part]);
					}
				}
			}
			return retty;
		},
		_getLongOptions: function( element ) {
			// Pull "long" options from the element, i.e.
			// data-datebox-mode="datebox" --> options.mode
			var key, temp,
				returnObj = {},
				prefix = "datebox",
				prefixLength = 7;

			for ( key in element.data() ) {
				if ( key.substr( 0, prefixLength ) === prefix && key.length > prefixLength ) {
					temp = key.substr( prefixLength );
					temp = temp.charAt( 0 ).toLowerCase() + temp.slice( 1 );
					if ( temp !== "options" ) {
						returnObj[ temp ] = element.data( key );
					}
				}
			}
			return returnObj;
		},
		disable: function() {
			var w = this;
			// Provide a PUBLIC function to Disable the element
			w.d.input.attr( "disabled", true );
			w.d.wrap.addClass( "ui-state-disabled" ).blur();
			w.disabled = true;
			w.d.mainWrap.addClass( "ui-state-disabled" );
			w._t( { method: "disable"});
		},
		enable: function() {
			var w = this;
			// Provide a PUBLIC function to Enable the element
			w.d.input.attr( "disabled", false );
			w.d.wrap.removeClass( "ui-state-disabled" );
			w.disabled = false;
			w.d.mainWrap.removeClass( "ui-state-disabled" );
			w._t( { method: "enable" });
		},
		_setOption: function() {
			$.Widget.prototype._setOption.apply( this, arguments );
			this.refresh();
		},
		getTheDate: function() {
			// Provide a PUBLIC function to get the current date.
			return this.theDate;
		},
		getLastDur: function() {
			// Provide a PUBLIC function to get the last entered duration
			return this.lastDuration;
		},
		setTheDate: function( newDate ) {
			// Provide a PUBLIC function to set the date
			// ACCEPTS: Date Object or String in proper output format
			if ( typeof( newDate ) === "object" ) {
				this.theDate = newDate;
			} else {
				this.theDate = this._makeDate( newDate );
			}
			this.refresh();
			this._t( { method: "doset" });
		},
		parseDate: function( format, strdate ) {
			// Provide a PUBLIC function to parse a date
			var retty,
				w = this;
				
			w.fmtOver = format;
			retty = w._makeDate( strdate );
			w.fmtOver = false;
			return retty;
		},
		callFormat: function( format, date ) {
			// Provide a PUBLIC function to get a formatted date
			return this._formatter( format, date );
		},
		getOption: function( opt ) {
			// Provide a PUBLIC function to get a defined option or i18n member
			var i18nTester = this.__(opt);
			if ( typeof i18nTester !== "undefined" ) {
				return i18nTester;
			} else {
				return this.options[ opt ];
			}
		},
		_t: function ( obj ) {
			this.d.input.trigger( "datebox", obj );
		}
	});


})( jQuery );
/*
 * jQuery-Mobile-DateBox 
 * Date: Fri Oct 3 2014 17:22:11 UTC
 * http://dev.jtsage.com/jQM-DateBox/
 * https://github.com/jtsage/jquery-mobile-datebox
 *
 * Copyright 2010, 2014 JTSage. and other contributors
 * Released under the MIT license.
 * https://github.com/jtsage/jquery-mobile-datebox/blob/master/LICENSE.txt
 *
 */


/*! FLIPBOX/TIMEFLIPBOX/DURATIONFLIPBOX Mode */

(function($) {
	$.extend( $.mobile.datebox.prototype.options, {
		themeDatePick: "b",
		themeDate: "a",
		useSetButton: true,
		validHours: false,
		flen: { 
			"y": 15,
			"m": 12,
			"d": 20,
			"h": 12,
			"i": 15,
		},
		durationStep: 1,
		durationSteppers: {
			"d": 1,
			"h": 1,
			"i": 1,
			"s": 1
		}
	});
	$.extend( $.mobile.datebox.prototype, {
		_fbox_pos: function () {
			var pos1, ech, top, fixer,
				w = this,
				par = this.d.intHTML.find( ".ui-datebox-flipcontent" ).innerHeight();
				
			w.d.intHTML.find( ".ui-datebox-flipcenter" ).each(function() {
				ech = $( this );
				top = ech.innerHeight();
				ech.css( "top", ( ( par / 2 ) - ( top / 2 ) - 3 ) * -1 );
			});
			w.d.intHTML.find( "ul" ).each(function () {
				ech = $( this );
				par = ech.parent().innerHeight();
				top = ech.find( "li" ).first();
				fixer = ech.find( "li" ).last().offset().top - ech.find("li").first().offset().top;
				pos1 = ( ( ( fixer-par ) / 2 ) + top.outerHeight() ) * -1;
				top.css( "marginTop", pos1 );
			});
			
		},
		_fbox_fixstep: function( order ) {
			// Turn back off steppers when displaying a less precise 
			// unit in the same control.
			var step = this.options.durationSteppers,
				actual = this.options.durationStep;
			
			if ( $.inArray( "h", order ) > -1 ) {
				step.d = 1;
				step.h = actual;
			}
			if ( $.inArray( "i", order ) > -1 ) {
				step.h = 1;
				step.i = actual;
			}
			if ( $.inArray( "s", order ) > -1 ) {
				step.i = 1;
				step.s = actual;
			}
		},
		_fbox_series: function (middle, side, type, neg) {
			// This builds the series that duration uses.
			var nxt, prv,
				o = this.options,
				maxval = ( type === "h" ) ? 24 : 60,
				ret = [ [ middle.toString(), middle ] ];
			 
			for ( var i = 1; i <= side; i++ ) {
				nxt = middle + ( i * o.durationSteppers[type] );
				prv = middle - ( i * o.durationSteppers[type] );
				ret.unshift([nxt.toString(), nxt]);
				if ( prv > -1 ) {
					ret.push([prv.toString(), prv]);
				} else {
					if ( neg ) {
						ret.push([(maxval+prv).toString(),prv]);
					} else {
						ret.push(["",-1]);
					}
				}
			}
			return ret;
		},
		_fbox_mktxt: {
			y: function(i) {
				return this.theDate.get(0) + i;
			},
			m: function(i) {
				var testDate = ( this.theDate.copy( [0], [0,0,1] ) ).adj( 1, i );
				return this.__("monthsOfYearShort")[ testDate.get(1) ];
			},
			d: function(i) {
				return ( this.theDate.copy([0,0,i]) ).get(2);
			},
			h: function(i) {
				var testDate = this.theDate.copy( [0,0,0,i] );
				return ( ( this.__("timeFormat") === 12 ) ?
					testDate.get12hr() :
					testDate.get(3) );
			},
			i: function(i) {
				return this._zPad( ( this.theDate.copy( [0,0,0,0,i] )).get(4) );
			}
		}
	});
	$.extend( $.mobile.datebox.prototype._build, {
		"timeflipbox": function() {
			this._build.flipbox.apply(this);
		},
		"durationflipbox": function() {
			this._build.flipbox.apply(this);
		},
		"flipbox": function () {
			var i, y, hRow, tmp, hRowIn, stdPos,
				w = this,
				o = this.options,
				g = this.drag,
				cDurS = {},
				normDurPositions = ["d", "h", "i", "s"],
				dur = ( o.mode === "durationflipbox" ? true : false ),
				uid = "ui-datebox-",
				flipBase = $( "<div class='ui-overlay-shadow'><ul></ul></div>" ),
				ctrl = $( "<div>", { "class": uid+"flipcontent" } ),
				ti = w.theDate.getTime() - w.initDate.getTime(),
				cDur = w._dur( ti<0 ? 0 : ti ),
				currentTerm, currentText;

			if ( ti < 0 ) {
				w.lastDuration = 0;
				if ( dur ) { w.theDate.setTime( w.initDate.getTime() ); }
			}

			if ( typeof w.d.intHTML !== "boolean" ) {
				w.d.intHTML.empty().remove();
			} else {
				w.d.input.on( "datebox", function (e,p) {
					if ( p.method === "postrefresh" ) {
						w._fbox_pos();
					}
				});
			}

			w.d.headerText = ( ( w._grabLabel() !== false) ? 
				w._grabLabel() : 
				( (o.mode === "flipbox") ?
					w.__( "titleDateDialogLabel" ) :
					w.__( "titleTimeDialogLabel" ) 
				)
			);
			w.d.intHTML = $( "<span>" );

			$(document).one( "popupafteropen", function() { 
				// This fixes bad positioning on initial open - not found a way around this yet.
				w._fbox_pos(); 
			});

			w.fldOrder = ( o.mode === "flipbox" ) ?
				w.__( "dateFieldOrder" ) :
				( dur ) ? 
					w.__("durationOrder") :
					w.__( "timeFieldOrder" );
					
			if ( !dur ) {
				w._check();
				w._minStepFix();
			}

			if ( o.mode === "flipbox" ) { 
				$("<div class='" + uid + "header'><h4>" +
						w._formatter(w.__( "headerFormat"), w.theDate) + "</h4></div>")
					.appendTo(w.d.intHTML); 
			}
			
			if ( dur ) {
				w._fbox_fixstep(w.fldOrder);
				
				tmp = $( "<div class='" + uid + "header ui-grid-" +
					w._gridblk.g[w.fldOrder.length] + "'></div>");
				
				for ( y = 0; y < w.fldOrder.length; y++ ) {
					$("<div class='" + uid + "fliplab ui-block-" + w._gridblk.b[ y ] + "'>" + 
							w.__( "durationLabel" )[$.inArray( w.fldOrder[y], normDurPositions )] + 
							"</div>"
						)
						.appendTo(tmp);
				}
				tmp.appendTo(w.d.intHTML);
				
				w.dateOK = true;
				cDurS.d = w._fbox_series(cDur[0],16,"d",false);
				cDurS.h = w._fbox_series(cDur[1],16,"h",(cDur[0]>0));
				cDurS.i = w._fbox_series(cDur[2],20,"i",(cDur[0]>0 || cDur[1]>0));
				cDurS.s = w._fbox_series(cDur[3],20,"s",(cDur[0]>0 || cDur[1]>0 || cDur[2]>0));
				
				ctrl.addClass( uid + "flipcontentd" );
				
				for ( y = 0; y < w.fldOrder.length; y++ ) {
					stdPos = w.fldOrder[ y ];
					currentTerm = cDur[ $.inArray( stdPos, normDurPositions ) ];
	
					hRow = w._makeEl( flipBase, { "attr": { 
						"field": stdPos,
						"amount": o.durationSteppers[ stdPos ]
					} });
					hRowIn = hRow.find( "ul" );
	
					for ( i in cDurS[ stdPos ] ) {
						$("<li><span>" + cDurS[ stdPos ][ i ][ 0 ] + "</span></li>" )
							.addClass("ui-body-" + ((cDurS[ stdPos ][ i ][ 1 ] !== currentTerm ) ?
								o.themeDate :
								o.themeDatePick)
							)
							.appendTo( hRowIn );
					}
					hRow.appendTo(ctrl);
				}
			}

			for ( y=0; ( y < w.fldOrder.length && !dur ); y++ ) {
				currentTerm = w.fldOrder[y];
				
				hRow = w._makeEl( flipBase, { "attr": { 
					"field": currentTerm,
					"amount": 1
				} } );
				hRowIn = hRow.find( "ul" );
						
				
				if ( typeof w._fbox_mktxt[currentTerm] === "function" ) {
					for ( i = -1 * o.flen[currentTerm]; i < ( o.flen[currentTerm] + 1 ); i++ ) {
						$("<li class='ui-body-" + 
								(( i !== 0 ) ? o.themeDate : o.themeDatePick) + "'><span>" + 
								w._fbox_mktxt[currentTerm].apply(w, [i]) + "</span></li>")
							.appendTo( hRowIn );
					}
					hRow.appendTo( ctrl );
				}
				if ( currentTerm === "a" && w.__("timeFormat") === 12 ) {
					currentText = $( "<li class='ui-body-" + o.themeDate + "'><span></span></li>");
					
					tmp = (w.theDate.get(3) > 11) ?
						[o.themeDate,o.themeDatePick,2,5] :
						[o.themeDatePick,o.themeDate,2,3];
						
					for ( i = -1 * tmp[2]; i < tmp[3]; i++ ) { 
						if ( i < 0 || i > 1 ) {
							currentText.clone().appendTo( hRowIn );
						} else {
							$("<li>", { "class" : "ui-body-" + tmp[i] } )
								.html( "<span>" + w.__( "meridiem" )[i] + "</span>" )
								.appendTo( hRowIn );
						}
					}
					hRow.appendTo( ctrl );
				}
			}
			
			w.d.intHTML.append( ctrl );
			
			$("<div>", { "class": uid + "flipcenter ui-overlay-shadow" } )
				.css( "pointerEvents", "none")
				.appendTo( w.d.intHTML );
			
			if ( o.useSetButton || o.useClearButton ) {
				y = $( "<div>", { "class": uid + "controls" } );
				
				if ( o.useSetButton ) {
					y.append( w._stdBtn.close.apply(
						w, [(o.mode==="datebox") ? 
							w.__("setDateButtonLabel") :
							( dur ) ?
								w.__("setDurationButtonLabel") :
								w.__("setTimeButtonLabel")]
					));
				}
					
				if ( o.useClearButton ) {
					y.append(w._stdBtn.clear.apply(w));
				}
				if ( o.useCollapsedBut ) {
					y.controlgroup({ type: "horizontal" });
					y.addClass( "ui-datebox-collapse" );
				} else {
					y.controlgroup();
				}
				y.appendTo(w.d.intHTML);
			}
			
			if ( w.wheelExists ) { // Mousewheel operation, if plugin is loaded
				w.d.intHTML.on( "mousewheel", ".ui-overlay-shadow", function(e,d) {
					e.preventDefault();
					w._offset($(this).data("field"), ((d<0)?-1:1)*$(this).data("amount"));
				});
			}
			
			w.d.intHTML.on(g.eStart, "ul", function(e,f) {
				if ( !g.move ) {
					if ( typeof f !== "undefined" ) { e = f; }
					g.move = true;
					g.target = $(this).find( "li" ).first();
					g.pos = parseInt(g.target.css("marginTop").replace(/px/i, ""),10);
					g.start = w.touch ? e.originalEvent.changedTouches[0].pageY : e.pageY;
					g.end = false;
					g.direc = ( dur ) ? -1 : 1;
					e.stopPropagation();
					e.preventDefault();
				}
			});
		}
	});
	$.extend( $.mobile.datebox.prototype._drag, {
		"timeflipbox": function() {
			this._drag.flipbox.apply(this);
		},
		"durationflipbox": function() {
			this._drag.flipbox.apply(this);
		},
		"flipbox": function() {
			var w = this,
				o = this.options,
				g = this.drag;
			
			$(document).on(g.eMove, function(e) {
				if ( g.move && o.mode.slice(-7) === "flipbox" ) {
					g.end = w.touch ? e.originalEvent.changedTouches[0].pageY : e.pageY;
					g.target.css("marginTop", (g.pos + g.end - g.start) + "px");
					e.preventDefault();
					e.stopPropagation();
					return false;
				}
			});
			
			$(document).on(g.eEnd, function(e) {
				if ( g.move && o.mode.slice(-7) === "flipbox" ) {
					g.move = false;
					if ( g.end !== false ) {
						e.preventDefault();
						e.stopPropagation();
						g.tmp = g.target.parent().parent();
						w._offset(
							g.tmp.data("field"),
							(parseInt((g.start - g.end) / ( g.target.outerHeight() - 2 ),10)*
								g.tmp.data( "amount" ) * g.direc));
					}
					g.start = false;
					g.end = false;
				}
			});
		}
	});
})( jQuery );
/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-datebox
 *
 * Translation by: J.T.Sage <jtsage@gmail.com>
 *
 */

jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
	'en': {
		setDateButtonLabel: "Set Date",
		setTimeButtonLabel: "Set Time",
		setDurationButtonLabel: "Set Duration",
		calTodayButtonLabel: "Jump to Today",
		titleDateDialogLabel: "Choose Date",
		titleTimeDialogLabel: "Choose Time",
		daysOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		daysOfWeekShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
		monthsOfYear: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		monthsOfYearShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		durationLabel: ["Days", "Hours", "Minutes", "Seconds"],
		durationDays: ["Day", "Days"],
		tooltip: "Open Date Picker",
		nextMonth: "Next Month",
		prevMonth: "Previous Month",
		timeFormat: 12,
		headerFormat: '%A, %B %-d, %Y',
		dateFieldOrder: ['m', 'd', 'y'],
		timeFieldOrder: ['h', 'i', 'a'],
		slideFieldOrder: ['y', 'm', 'd'],
		dateFormat: "%-m/%-d/%Y",
		useArabicIndic: false,
		isRTL: false,
		calStartDay: 0,
		clearButton: "Clear",
		durationOrder: ['d', 'h', 'i', 's'],
		meridiem: ["AM", "PM"],
		timeOutput: "%l:%M %p",
		durationFormat: "%Dd %DA, %Dl:%DM:%DS",
		calDateListLabel: "Other Dates",
		calHeaderFormat: "%B %Y",
		calTomorrowButtonLabel: "Jump to Tomorrow"
	}
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
	useLang: 'en'
});

/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-datebox
 *
 * Translation by: Chris P. Vigelius <me@cv.gd>, Pascal Hofmann <crowdin>
 *
 */

jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
	'de': {
		setDateButtonLabel: "Datum einstellen",
		setTimeButtonLabel: "Zeit einstellen",
		setDurationButtonLabel: "Dauer einstellen",
		calTodayButtonLabel: "heute",
		titleDateDialogLabel: "Datum wählen",
		titleTimeDialogLabel: "Zeit wählen",
		daysOfWeek: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
		daysOfWeekShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
		monthsOfYear: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
		monthsOfYearShort: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dez"],
		durationLabel: ["Tage", "Stunden", "Minuten", "Sekunden"],
		durationDays: ["Tag", "Tage"],
		tooltip: "Öffne Datumsauswahl",
		nextMonth: "Nächster Monat",
		prevMonth: "Vorheriger Monat",
		timeFormat: 24,
		headerFormat: '%A, %B %-d, %Y',
		dateFieldOrder: ['d','m','y'],
		timeFieldOrder: ['h', 'i', 'a'],
		slideFieldOrder: ['y', 'm', 'd'],
		dateFormat: "%d.%m.%Y",
		useArabicIndic: false,
		isRTL: false,
		calStartDay: 0,
		clearButton: "löschen",
		durationOrder: ['d', 'h', 'i', 's'],
		meridiem: ["AM", "PM"],
		timeOutput: "%k:%M",
		durationFormat: "%Dd %DA, %Dl:%DM:%DS",
		calDateListLabel: "Weitere Termine",
		calHeaderFormat: "%B %Y",
		calTomorrowButtonLabel: "Springen bis morgen"
	}
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
	useLang: 'de'
});

