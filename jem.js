// Define the namespace
if (typeof Inaka == 'undefined') Inaka = {};
if (typeof Inaka.Jem == 'undefined') Inaka.Jem = {};

// The code
(function()
 {
   // API
   this.encode = function(obj)
                 {
                   var r = [131];
                   _encodeValue(obj, r);
                   return r;
                 };
   this.decode = function(bin)
                 {
                   return bin[0] != 131 ? "badarg" : _decodeValue(bin, 1)[0];
                 };

   // Internal functions
   function _encodeValue(value, a)
   {
     if(value === null)
     {
       _encodeNull(a);
     }
     else
     {
       switch(value.constructor.name)
       {
         case "Object":  _encodeObject(value, a);  break;
         case "Number":  _encodeNumber(value, a);  break;
         case "Array":   _encodeArray(value, a);   break;
         case "String":  _encodeString(value, a);  break;
         case "Boolean": _encodeBoolean(value, a); break;
       }
     }
   }

   function _decodeValue(a, i)
   {
     switch(a[i])
     {
       case 100:
         return _decodeAtom(a, i + 1);
       case 116:
         return _decodeObject(a, i + 1);
       case 97:
         return _readByte(a, i + 1);
       case 98:
         return _readInt(a, i + 1);
       case 108:
         return _decodeArray(a, i + 1);
       case 109:
         return _decodeString(a, i + 1);
     }
   }

   function _encodeNull(a)
   {
     _writeByte(100, a);
     _writeShort(4, a);
     _writeInt(1853189228, a);
   }

   function _decodeAtom(a, i)
   {
     var [l, i] = _readShort(a, i);
     var str = "";
     for(var k = 0; k < l; k++)
     {
       str += String.fromCharCode(a[i + k]);
     }
     var value;
     switch (str)
     {
       case "null":  value = null;  break;
       case "true":  value = true;  break;
       case "false": value = false; break;
     }
     return [value, i + k];
   }

   function _encodeObject(obj, a)
   {
     _writeByte(116, a);
     var keys = Object.keys(obj);
     var l = keys.length
     _writeInt(l, a);
     for(var i = 0; i < l; i++)
     {
       var k = keys[i];
       _encodeString(k, a);
       _encodeValue(obj[k], a);
     }
   }

   function _decodeObject(a, i)
   {
     var [l, i] = _readInt(a, i);
     var obj = {};
     for(var k = 0; k < l; k++)
     {
       var [key, i] = _decodeString(a, i + 1);
       var [value, i] = _decodeValue(a, i);
       obj[key] = value;
     }
     return [obj, i];
   }

   // NOTE: THIS WILL NOT WORK WITH FLOATS
   function _encodeNumber(num, a)
   {
     if (num < 255)
     {
       _writeByte(97, a);
       _writeByte(num, a);
     }
     else
     {
       _writeByte(98, a);
       _writeInt(num, a);
     }
   }

   function _encodeArray(arr, a)
   {
     _writeByte(108, a);
     var l = arr.length;
     _writeInt(l, a);
     for(var i = 0; i < l; i++)
     {
       _encodeValue(arr[i], a);
     }
     _writeByte(106, a);
   }

   function _decodeArray(a, i)
   {
     var [l, i] = _readInt(a, i);
     var arr = [];
     for(var k = 0; k < l; k++)
     {
       var [value, i] = _decodeValue(a, i);
       arr[k] = value;
     }
     return [arr, i + 1];
   }

   function _encodeString(str, a)
   {
     _writeByte(109, a);
     var l = str.length;
     _writeInt(l, a);
     for(var i = 0; i < l; i++)
     {
       _writeByte(str.charCodeAt(i), a);
     }
   }

   function _decodeString(a, i)
   {
     var [l, i] = _readInt(a, i);
     var str = "";
     for(var k = 0; k < l; k++)
     {
       str += String.fromCharCode(a[i + k]);
     }
     return [str, i + k];
   }

   function _encodeBoolean(bool, a)
   {
     _writeByte(100, a);
     if (bool)
     {
       _writeShort(4, a);
       _writeInt(1953658213, a);
     }
     else
     {
       _writeShort(5, a);
       _writeByte(102, a);
       _writeInt(1634497381, a);
     }
   }

   // Utils
   function _writeByte(byte, a)
   {
     a[a.length] = byte;
   }

   function _readByte(a, i)
   {
     return [a[i++], i];
   }

   function _writeShort(short, a)
   {
     var l = a.length;
     a[l + 0] = (short >> 8) & 255;
     a[l + 1] = short & 255;
   }

   function _readShort(a, i)
   {
     return [(a[i++] << 8) + a[i++], i];
   }

   function _writeInt(int, a)
   {
     var l = a.length;
     a[l + 0] = (int >> 24) & 255;
     a[l + 1] = (int >> 16) & 255;
     a[l + 2] = (int >> 8) & 255;
     a[l + 3] = int & 255;
   }

   function _readInt(a, i)
   {
     return [(a[i++] << 24) + (a[i++] << 16) + (a[i++] << 8) + a[i++], i];
   }
 }).call(Inaka.Jem)