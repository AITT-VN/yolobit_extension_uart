const ColorBlock = "#0b5394";

Blockly.Blocks['uart_init'] = {
  init: function() {
    this.jsonInit(
      {
        type: "uart_init",
        message0: "khởi tạo UART chân RX %1 chân TX %2 baudrate %3",
        previousStatement: null,
        nextStatement: null,
        args0: [
          {
            type: "field_dropdown",
            name: "RX",
            "options": [
              [
                "P3",
                "pin3"
              ],
              [
                "P0",
                "pin0"
              ],
              [
                "P1",
                "pin1"
              ],
              [
                "P2",
                "pin2"
              ],
              [
                "P4",
                "pin4"
              ],
              [
                "P5",
                "pin5"
              ],
              [
                "P6",
                "pin6"
              ],
              [
                "P7",
                "pin7"
              ],
              [
                "P8",
                "pin8"
              ],
              [
                "P9",
                "pin9"
              ],
              [
                "P10",
                "pin10"
              ],
              [
                "P11",
                "pin11"
              ],
              [
                "P12",
                "pin12"
              ],
              [
                "P13",
                "pin13"
              ],
              [
                "P14",
                "pin14"
              ],
              [
                "P15",
                "pin15"
              ],
              [
                "P16",
                "pin16"
              ]
            ]
          },
          {
            "type": "field_dropdown",
            "name": "TX",
            "options": [
              [
                "P6",
                "pin6"
              ],
              [
                "P0",
                "pin0"
              ],
              [
                "P1",
                "pin1"
              ],
              [
                "P2",
                "pin2"
              ],
              [
                "P3",
                "pin3"
              ],
              [
                "P4",
                "pin4"
              ],
              [
                "P5",
                "pin5"
              ],              
              [
                "P7",
                "pin7"
              ],
              [
                "P8",
                "pin8"
              ],
              [
                "P9",
                "pin9"
              ],
              [
                "P10",
                "pin10"
              ],
              [
                "P11",
                "pin11"
              ],              
              [
                "P12",
                "pin12"
              ],
              [
                "P13",
                "pin13"
              ],
              [
                "P14",
                "pin14"
              ],
              [
                "P15",
                "pin15"
              ],
              [
                "P16",
                "pin16"
              ]
            ]
          },
          {
            "type": "field_number",
            "name": "BAUDRATE",
            "value": 115200
          }
        ],
        colour: ColorBlock,
        tooltip: "khởi tạo kết nối UART",
        helpUrl: ""
      }
    );
  }
};

Blockly.Python['uart_init'] = function(block) {
  // TODO: Assemble Python into code variable.
  var tx = block.getFieldValue('TX');
  var rx = block.getFieldValue('RX');
  var baudrate = block.getFieldValue('BAUDRATE');
  Blockly.Python.definitions_['import_yolobit'] = 'from yolobit import *';
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  var code = 'uart = machine.UART(2, baudrate=' + baudrate + ', rx=' + rx + '.pin, tx=' + tx + '.pin); uart.init(parity=None, stop=1, bits=8)\n';
  return code;
};

Blockly.Blocks["uart_read_until"] = {
  init: function () {
    this.jsonInit({
      colour: "#0b5394",
      tooltip: "đọc dữ liệu từ UART",
      message0: "đọc UART cho đến ký tự %1",
      output: null,
      args0: [
        {
          type: "field_dropdown",
          name: "END_CHAR",
          options: [
            ["xuống dòng", "\\n"],
            [",", ","],
            ["$", "$"],
            [":", ":"],
            [".", "."],
            ["#", "#"],
            ["CR", "\\r"],
            ["khoảng trắng", " "],
            ["tab", "\\t"],
            ["|", "|"],
            [";", ";"],
          ],
        }
      ],
      helpUrl: "",
    });
  },
};

Blockly.Python['uart_read_until'] = function(block) {
  // TODO: Assemble Python into code variable.
  var eol = block.getFieldValue('END_CHAR');
  Blockly.Python.definitions_['import_yolobit'] = 'from yolobit import *';
  
  var cbFunctionName = Blockly.Python.provideFunction_(
    'uart_read_until',
    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(eol):',
      "  result = ''",
      "  while uart.any():",
      "    new_char = uart.read(1).decode()",
      "    if new_char == eol:",
      "      return result",
      "    else:",
      "      result += str(new_char)",
      "  return result",
    ]);
  
  var code = cbFunctionName + '("' + eol + '")';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks["uart_write_string"] = {
  init: function () {
    this.jsonInit({
      colour: "#0b5394",
      nextStatement: null,
      tooltip: "gửi dữ liệu qua UART",
      message0: "gửi chuỗi %1 %2 qua UART",
      previousStatement: null,
      args0: [
        {
          type: "input_dummy",
        },
        {
          type: "input_value",
          name: "MESSAGE",
        },
      ],
      helpUrl: "",
    });
  },
};

Blockly.Python['uart_write_string'] = function(block) {
  // TODO: Assemble Python into code variable.
  var msg = Blockly.Python.valueToCode(block, 'MESSAGE', Blockly.Python.ORDER_ATOMIC);
  var code = 'uart.write(str(' + msg + '))\n';
  return code;
};

Blockly.Blocks["uart_read_bytes"] = {
  init: function () {
    this.jsonInit({
      colour: ColorBlock,
      tooltip: "đọc n bytes từ UART",
      message0: "đọc UART %1 %2 bytes ",
      output: null,
      args0: [
        {
          type: "input_dummy",
        },
        {
          type: "input_value",
          name: "BYTES",
        },
      ],
      helpUrl: "",
    });
  },
};

Blockly.Python['uart_read_bytes'] = function(block) {
  // TODO: Assemble Python into code variable.
  var bytes = Blockly.Python.valueToCode(block, 'BYTES', Blockly.Python.ORDER_ATOMIC);
  var code = 'uart.read(' + bytes + ')';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks["uart_write_bytes"] = {
  init: function () {
    this.jsonInit({
      colour: ColorBlock,
      nextStatement: null,
      tooltip: "gửi dữ liệu dạng byte vào UART",
      message0: "gửi bytes %1 %2 qua UART",
      previousStatement: null,
      args0: [
        {
          type: "input_dummy",
        },
        {
          type: "input_value",
          name: "BYTES",
        }
      ],
      helpUrl: "",
    });
  },
};

Blockly.Python['uart_write_bytes'] = function(block) {
  // TODO: Assemble Python into code variable.
  Blockly.Python.definitions_['import_ubinascii'] = 'import ubinascii';
  var bytes = Blockly.Python.valueToCode(block, 'BYTES', Blockly.Python.ORDER_ATOMIC);
  var bytes_after = bytes.split(",");
  bytes_after =  bytes.split(" ");
  console.log(bytes_after);
  //var code = 'uart.write(bytearray([' + bytes.split(",") + ']))\n';
  var code = 'uart.write(bytearray([' + bytes_after + ']))\n';
  return code;
};

Blockly.Blocks["uart_check_data"] = {
  init: function () {
    this.jsonInit({
      colour: ColorBlock,
      tooltip: "kiểm tra xem có dữ liệu gửi đến UART hay không",
      message0: "có dữ liệu gửi đến UART?",
      output: null,
      args0: [
      ],
      helpUrl: "",
    });
  },
};

Blockly.Python['uart_check_data'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'uart.any()';
  return [code, Blockly.Python.ORDER_NONE];
};



Blockly.Blocks["uart_deinit"] = {
  init: function () {
    this.jsonInit({
      colour: ColorBlock,
      nextStatement: null,
      tooltip: "tắt và hủy kết nối UART",
      message0: "tắt kết nối UART",
      previousStatement: null,
      args0: [
      ],
      helpUrl: "",
    });
  },
};

Blockly.Python['uart_deinit'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'uart.deinit()\n';
  return code;
};