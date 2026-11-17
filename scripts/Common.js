 var conf = "tech";
 var ppth = fb.ProfilePath;
 var sdir = ppth + "skins\\" + conf + "\\settings\\";
 var ForReading = 1;
 var ForWriting = 2;
 var fso = new ActiveXObject("Scripting.FileSystemObject");
 settings_exists(conf);

 function read_option(opt, val) {
     var odir = sdir + opt + "\\";
     if (!fso.FolderExists(odir)) {
         fso.CreateFolder(odir)
     } else {
         var e = new Enumerator(fso.GetFolder(odir).Files);
         var s;
         for (; !e.atEnd();
         e.moveNext()) {
             s = e.item();
             if (utils.PathWildcardMatch("*", s.Name)) {
                 return s.Name
             }

         }

     }
     fso.CreateTextFile(odir + val, ForWriting);
     return val
 }

 function update_option(opt, val) {
     var odir = sdir + opt + "\\";
     if (!fso.FolderExists(odir)) {
         fso.CreateFolder(odir);
         fso.CreateTextFile(odir + val, ForWriting)
     } else {
         var e = new Enumerator(fso.GetFolder(odir).Files);
         var s;
         for (; !e.atEnd();
         e.moveNext()) {
             s = e.item();
             if (utils.PathWildcardMatch("*", s.Name)) {
                 fso.MoveFile(odir + s.Name, odir + val);
                 break
             }

         }

     }
     return val
 }

 function settings_exists(conf) {
     if (fso.FolderExists(ppth + "skins") == false) {
         fso.CreateFolder(ppth + "skins");
         fso.CreateFolder(ppth + "skins\\" + conf);
         fso.CreateFolder(ppth + "skins\\" + conf + "\\settings");
     } else {
         if (fso.FolderExists(ppth + "skins\\" + conf) == false) {
             fso.CreateFolder(ppth + "skins\\" + conf);
             fso.CreateFolder(ppth + "skins\\" + conf + "\\settings");
         } else {
             if (fso.FolderExists(ppth + "skins\\" + conf + "\\settings") == false) {
                 fso.CreateFolder(ppth + "skins\\" + conf + "\\settings");
             }

         }

     }

 }

 function folder_exists(chemin) {
     var bool = fso.FolderExists(chemin);
     return bool;
 }

 function file_exists(chemin) {
     var bool = fso.Fileexists(chemin);
     return bool;
 }

 var VK_BACK = 0x08;
 var VK_RETURN = 0x0D;
 var VK_SHIFT = 0x10;
 var VK_CONTROL = 0x11;
 var VK_ALT = 0x12;
 var VK_ESCAPE = 0x1B;
 var VK_PGUP = 0x21;
 var VK_PGDN = 0x22;
 var VK_END = 0x23;
 var VK_HOME = 0x24;
 var VK_LEFT = 0x25;
 var VK_UP = 0x26;
 var VK_RIGHT = 0x27;
 var VK_DOWN = 0x28;
 var VK_INSERT = 0x2D;
 var VK_DELETE = 0x2E;
 var KMask = {
     none: 0,
     ctrl: 1,
     shift: 2,
     ctrlshift: 3,
     ctrlalt: 4,
     ctrlaltshift: 5
 }

 var temp_bmp = gdi.CreateImage(1, 1);
 var temp_gr = temp_bmp.GetGraphics();

 function GetKeyboardMask() {
     var c = utils.IsKeyPressed(VK_CONTROL) ? true : false;
     var a = utils.IsKeyPressed(VK_ALT) ? true : false;
     var s = utils.IsKeyPressed(VK_SHIFT) ? true : false;
     var ret = KMask.none;
     if (c && !a && !s) ret = KMask.ctrl;
     if (!c && !a && s) ret = KMask.shift;
     if (c && !a && s) ret = KMask.ctrlshift;
     if (c && a && !s) ret = KMask.ctrlalt;
     if (c && a && s) ret = KMask.ctrlaltshift;
     return ret
 }

 searchbox = function () {
     this.font = gdi.Font("segoe ui", 12, 1);
     this.create = function (w, h, default_text, stext, bgcolour0, bgcolour1, textcolour0, textcolour1, selectcolour, func, autotimer_value) {
         this.w = w;
         this.h = h;
         this.autotimer_value = autotimer_value;
         this.bgcolour0 = bgcolour0;
         this.bgcolour1 = bgcolour1;
         this.textcolour0 = textcolour0;
         this.textcolour1 = textcolour1;
         this.selectcolour = selectcolour;
         this.stext = stext;
         this.default_text = default_text;
         if (this.default_text == "Library Filter...") window.SetProperty("Last entry", this.stext);
         this.text = this.stext.length > 0 ? this.stext : this.default_text;
         this.edit = false;
         this.offset = 0;
         this.Cx = 0;
         this.Cpos = 0;
         this.Spos = 0;
         this.selbegin = 0;
         this.selend = 0;
         this.TLength = 0;
         this.TWidth = 0;
         this.select = false;
         this.insert = true;
         this.hover = false;
         this.func = func;
     }

     this.draw = function (gr, x, y) {
         //var gb;
         //var tmp_pix;
         this.x = x;
         this.y = y;
         if (this.edit) {
             this.ForceVisible();
             //gr.FillSolidRect(this.x, this.y, this.w, this.h, RGB(245,245,245));
             var colour = this.textcolour1;
             var DT = DT_LEFT | DT_SINGLELINE | DT_NOPREFIX | DT_CALCRECT
         } else {
             //gr.FillSolidRect(this.x, this.y, this.w, this.h, RGB(245,245,245));
             var colour = this.textcolour0;
             var DT = DT_LEFT | DT_SINGLELINE | DT_NOPREFIX | DT_CALCRECT | DT_END_ELLIPSIS
         }

         //tmp_pix = gdi.CreateImage(this.w, this.h);
         //gb = tmp_pix.GetGraphics();
         //gb.SetTextRenderingHint(5);
         //gb.SetSmoothingMode(2);
         //gb.GdiDrawText(this.text.substr(this.offset),this.font,colour,0,0,this.w,this.h,DT);
         //tmp_pix.ReleaseGraphics(gb);
         //gr.DrawImage(tmp_pix, this.x, this.y, this.w, this.h, 0, 0, this.w, this.h, 0, 255);
         gr.GdiDrawText(this.text.substr(this.offset), this.font, colour, this.x, this.y, this.w, this.h, DT);
         //gr.DrawString(this.text.substr(this.offset), this.font, colour, this.x, this.y, this.w, this.h, lt_stringformat);
         if (this.edit) this.DrawCursor(gr)
     }

     this.on_mouse_move = function (x, y) {
         var hov = (x > this.x && x < (this.x + this.w) && y > this.y && y < (this.y + this.h)) ? true : false;
         this.hover = hov;
     }

     this.on_mouse_lbtn_down = function (x, y) {
         if (this.hover) {
             if (this.text == this.default_text) {
                 this.text = "";
             }

             this.edit = true;
             this.select = false;
             this.CalcText();
             this.GetCPos(x);
             this.Spos = this.Cpos;
             this.ReDraw();
         } else {
             if (this.edit) {
                 if (this.text.length == 0) {
                     this.text = this.default_text
                 }

                 this.edit = false;
                 this.select = false;
                 this.ReDraw();
             }

         }

     }

     this.on_mouse_lbtn_up = function (x, y) {
         return true;
     }

     this.on_mouse_rbtn_up = function (x, y) {}

     this.on_focus = function (is_focused) {
         if (!is_focused && this.edit) {
             if (this.text.length == 0) {
                 this.text = this.default_text;
             }

             this.edit = false;
             this.select = false;
             window.Repaint();
         }

     }

     this.on_timer = function (id) {
         if (this.autotimer) {
             if (this.autotimer.ID == id) {
                 window.KillTimer(this.autotimer);
                 this.on_key_down(VK_RETURN);
             }

         }

     }

     this.on_activate = function (act) {}

     this.on_key_down = function (vkey) {
         var kmask = GetKeyboardMask();
         this.on_key(vkey, kmask);
     }

     this.on_key = function (vkey, mask) {
         if (mask == KMask.none) {
             switch (vkey) {
             case VK_BACK:
                 if (this.edit) {
                     if (this.select) {
                         this.text = this.text.slice(0, this.selbegin) + this.text.slice(this.selend);
                         this.Cpos = this.selbegin;
                         this.select = false;
                         this.CalcText();
                     } else {
                         if (this.Cpos > 0) {
                             this.text = this.text.slice(0, this.Cpos - 1) + this.text.slice(this.Cpos);
                             this.Cpos--;
                             if (this.offset > 0) {
                                 this.offset--;
                                 this.Cx = temp_gr.CalcTextWidth(this.text.substr(this.offset, this.Cpos - this.offset), this.font);
                             }

                             this.CalcText();
                             this.autotimer && window.KillTimer(this.autotimer);
                             if (this.autotimer_value > 0) this.autotimer = window.CreateTimerInterval(this.autotimer_value);
                         }

                     }

                 }

                 break;
             case VK_RETURN:
                 if (this.edit) {
                     if (this.autotimer_value > 0) {
                         if (this.func) this.func(this.text);
                     } else {
                         this.edit = false;
                         if (this.func) this.func(this.text);
                         window.Repaint();
                     }

                     this.stext = this.text;
                     if (this.default_text == "Library Filter...") window.SetProperty("Last entry", this.stext);
                 } else {
                     this.select = false;
                     this.CPos = this.TLength;
                 }

                 break;
             case VK_ESCAPE:
                 if (this.edit) {
                     this.edit = false;
                     this.select = false;
                     window.Repaint();
                 }

                 break;
             case VK_END:
                 if (this.edit) {
                     this.Cpos = this.TLength;
                     this.select = false;
                 }

                 break;
             case VK_HOME:
                 if (this.edit) {
                     this.Cpos = 0;
                     this.offset = 0;
                     this.select = false;
                 }

                 break;
             case VK_LEFT:
                 if (this.edit) {
                     if (this.select) {
                         this.Cpos = this.selbegin;
                         this.select = false;
                     } else if (this.Cpos > 0) this.Cpos--;
                 }

                 break;
             case VK_UP:
                 if (this.edit) {
                     this.select = false;
                 }

                 break;
             case VK_RIGHT:
                 if (this.edit) {
                     if (this.select) {
                         this.select = false;
                     } else if (this.Cpos < this.TLength) this.Cpos++;
                 }

                 break;
             case VK_DOWN:
                 if (this.edit) {
                     this.select = false;
                 }

                 break;
             case VK_INSERT:
                 this.insert = !this.insert;
                 break;
             case VK_DELETE:
                 if (this.edit) {
                     if (this.select) {
                         this.text = this.text.slice(0, this.selbegin) + this.text.slice(this.selend);
                         this.Cpos = this.selbegin;
                         this.select = false;
                         this.CalcText();
                     } else {
                         this.text = this.text.slice(0, this.Cpos) + this.text.slice(this.Cpos + 1);
                         this.CalcText();
                         this.autotimer && window.KillTimer(this.autotimer);
                         if (this.autotimer_value > 0) this.autotimer = window.CreateTimerInterval(this.autotimer_value);
                     }

                 }

                 break
             }

             if (this.edit) this.ReDraw();
         }

     }

     this.on_char = function (code, mask) {
         if (code == 1 && this.edit && mask == KMask.ctrl) {
             this.Spos = 0;
             this.Cpos = this.text.length;
             this.select = true;
             this.ReDraw();
         }

         if (code == 3 && this.edit && this.select && mask == KMask.ctrl) {}

         if (code == 22 && this.edit && mask == KMask.ctrl) {}

         if (code == 24 && this.edit && this.select && mask == KMask.ctrl) {
             FormsAndButtons.CopyBuffer = this.text.substr(this.selbegin, this.selend - this.selbegin);
             this.text = this.text.slice(0, this.selbegin) + this.text.slice(this.selend);
             this.Cpos = this.selbegin;
             this.select = false;
             this.CalcText();
             this.CalcOText();
             this.ReDraw();
         }

         if (code == 9) {}

         if (code == 26 && this.edit && mask == KMask.ctrl) {
             this.text = this.stext;
             this.Cpos = this.TLength;
             this.select = false;
             this.CalcText();
             this.ReDraw();
         }

         if (code > 31 && this.edit) {
             if (this.select) {
                 var p1 = this.selbegin;
                 var p2 = this.selend;
                 this.Cpos = this.selbegin;
                 this.select = false;
             } else {
                 var p1 = this.Cpos;
                 var p2 = this.Cpos;
                 if (!this.insert) p2++;
             }

             this.text = this.text.slice(0, p1) + String.fromCharCode(code) + this.text.slice(p2);
             this.Cpos++;
             this.CalcText();
             this.ReDraw();
             this.autotimer && window.KillTimer(this.autotimer);
             if (this.autotimer_value > 0) this.autotimer = window.CreateTimerInterval(this.autotimer_value);
         }

     }

     this.CalcText = function () {
         var arr = temp_gr.GdiDrawText(this.text, this.font, 0, 0, 0, 9999999, 9999999, DT_NOPREFIX | DT_CALCRECT | DT_NOPREFIX).toArray();
         this.TLength = arr[4];
         this.TWidth = temp_gr.CalcTextWidth(this.text, this.font);
     }

     this.DrawSelection = function (gr) {
         var tmp = this.Cpos > this.Spos;
         this.selbegin = tmp ? this.Spos : this.Cpos;
         this.selend = tmp ? this.Cpos : this.Spos;
         if (this.selbegin < this.offset) this.selbegin = this.offset;
         if (this.selbegin != this.selend) {
             var Sx1 = temp_gr.CalcTextWidth(this.text.substr(this.offset, this.selbegin - this.offset), this.font);
             var Sx2 = temp_gr.CalcTextWidth(this.text.substr(this.offset, this.selend - this.offset), this.font);
             gr.FillSolidRect(this.x + Sx1, this.y, Sx2 - Sx1, this.h, this.selectcolour);
         }

     }

     this.DrawCursor = function (gr) {
         if (!this.insert) {
             var x1 = this.x + this.Cx;
             var x2 = this.x + this.Cx;
             var y1 = this.y + 1;
             var y2 = this.y + this.h - 2;
             var lt = 1;
         } else {
             var x1 = this.x + this.Cx;
             var x2 = this.x + this.Cx;
             var y1 = this.y + 1;
             var y2 = this.y + this.h - 2;
             var lt = 1;
         }

         gr.DrawLine(x1, y1, x2, y2, lt, this.textcolour1);
     }

     this.ReDraw = function () {
         window.Repaint();
     }

     this.Reset = function () {
         if (this.text != this.default_text) {
             this.edit = false;
             this.text = this.default_text;
             this.stext = "";
             if (this.default_text == "Quick Search...") window.SetProperty("Last entry", this.stext);
             window.Repaint();
         }

     }

     this.ForceVisible = function () {
         while (this.Cpos < this.offset) this.offset--;
         this.Cx = temp_gr.CalcTextWidth(this.text.substr(this.offset, this.Cpos - this.offset), this.font);
         while (this.Cx > this.w) {
             this.offset++;
             this.Cx = temp_gr.CalcTextWidth(this.text.substr(this.offset, this.Cpos - this.offset), this.font);
         }

     }

     this.GetCPos = function (x) {
         x -= this.x;
         this.Cpos = this.offset;
         var trlen = temp_gr.CalcTextWidth(this.text.substr(this.offset), this.font);
         if (x > trlen) this.Cpos = this.TLength;
         else {
             //var arr = temp_gr.GdiDrawText(this.text.substr(this.offset), this.font, 0, 0, 0, this.w, this.THeight, DT_WORDBREAK | DT_NOPREFIX | DT_EDITCONTROL | DT_CALCRECT).toArray();
             var arr = temp_gr.GdiDrawText(this.text.substr(this.offset), this.font, 0, 0, 0, this.w, this.THeight, lt_stringformat).toArray();
             var tmp = x / trlen * arr[4];
             var td1 = x - temp_gr.CalcTextWidth(this.text.substr(this.offset, tmp), this.font);
             var sign = td1 == 0 ? 1 : Math.abs(td1) / td1;
             var e = 0;
             do {
                 tmp += sign;
                 td2 = x - temp_gr.CalcTextWidth(this.text.substr(this.offset, tmp), this.font);
                 t = td1;
                 td1 = td2;
                 e++;
                 if (e > 100) {
                     break;
                 }

             }

             while (Math.abs(td2) < Math.abs(t));
             this.Cpos += Math.floor(tmp - sign);
         }

     }

 }

 button = function () {
     this.font = gdi.Font("segoe ui", 12, 0);
     this.ButtonStates = {
         normal: 0,
         hover: 1,
         down: 2
     };
     var tmp;
     this.tmp_img = gdi.CreateImage(600, 100);
     this.gb = this.tmp_img.GetGraphics();
     this.create = function (path_normal, path_hover, path_down, label_button, zorder) {
         if (zorder < 0) {
             if (typeof this.normal == "undefined") {
                 this.normal = path_normal;
                 this.hover = path_hover;
                 this.down = path_down;
                 this.text = label_button;
                 this.zorder = zorder;
                 this.x = 0;
                 this.y = 0;
                 if (label_button != "") {
                     this.w = 10 + this.gb.MeasureString(label_button + "_", this.font, 0, 0, this.tmp_img.Width, this.tmp_img.Height).Width;
                     this.h = 10 + this.gb.MeasureString(label_button + "_", this.font, 0, 0, this.tmp_img.Width, this.tmp_img.Height).Height;
                 } else {
                     this.w = this.normal.Width;
                     this.h = this.normal.Height;
                 }

                 this.state = this.ButtonStates.normal;
                 this.g_timer_counter = 0;
             } else {
                 this.update(path_normal, path_hover, path_down, label_button, zorder);
             }

         } else {
             if (typeof this.normal == "undefined") {
                 this.normal = gdi.Image(path_normal);
                 this.hover = gdi.Image(path_hover);
                 this.down = gdi.Image(path_down);
                 this.text = label_button;
                 this.zorder = zorder;
                 this.x = 0;
                 this.y = 0;
                 if (label_button != "") {
                     this.w = 10 + this.gb.MeasureString(label_button, this.font, 0, 0, this.tmp_img.Width, this.tmp_img.Height).Width;
                     this.h = 10 + this.gb.MeasureString(label_button, this.font, 0, 0, this.tmp_img.Width, this.tmp_img.Height).Height;
                 } else {
                     this.w = this.normal.Width;
                     this.h = this.normal.Height;
                 }

                 this.state = this.ButtonStates.normal;
                 this.g_timer_counter = 0;
             } else {
                 this.update(path_normal, path_hover, path_down, label_button, zorder);
             }

         }

     }

     this.update = function (path_normal, path_hover, path_down, label_button, zorder) {
         if (zorder < 0) {
             this.normal = path_normal;
             this.hover = path_hover;
             this.down = path_down;
             this.text = label_button;
             this.zorder = zorder;
         } else {
             this.normal = gdi.Image(path_normal);
             this.hover = gdi.Image(path_hover);
             this.down = gdi.Image(path_down);
             this.text = label_button;
             this.zorder = zorder;
         }

     }

     this.resize = function (ww, hh) {
         if (typeof this.normal != "undefined") {
             this.normal.Resize(ww, hh);
             this.hover.Resize(ww, hh);
             this.down.Resize(ww, hh);
             this.w = ww;
             this.h = hh;
         }

     }

     this.ontimer = function (id) {
         if (this.g_timer) {
             switch (id) {
             case this.g_timer.ID:
                 if (this.g_timer_sens == 1) {
                     this.g_timer_counter = (this.g_timer_counter < 10) ? this.g_timer_counter + 2 : this.g_timer_counter;
                     if (this.g_timer_counter == 10) this.g_timer && window.KillTimer(this.g_timer);
                 } else {
                     this.g_timer_counter = (this.g_timer_counter > 0) ? this.g_timer_counter - 2 : 0;
                     if (this.g_timer_counter == 0) this.g_timer && window.KillTimer(this.g_timer);
                 }

                 if (this.y >= 0) {
                     window.RepaintRect(this.x, this.y, this.w + 1, this.h + 1)
                 }

                 break;
             }

         }

     }

     this.draw = function (gr, bx, by, alpha, label) {
         this.x = bx;
         this.y = by;
         this.label_normal_colour = RGBA(255, 255, 255, 205 + this.g_timer_counter * 5);
         this.label_hover_colour = RGBA(0, 0, 0, 205 + this.g_timer_counter * 5);
         this.label_down_colour = RGBA(255, 255, 255, 205 + this.g_timer_counter * 5);
         switch (this.state) {
         case this.ButtonStates.normal:
             this.img_displayed = this.normal;
             this.label_colour = this.label_normal_colour;
             break;
         case this.ButtonStates.hover:
             this.img_displayed = this.hover;
             this.label_colour = this.label_hover_colour;
             break;
         case this.ButtonStates.down:
             this.img_displayed = this.down;
             this.label_colour = this.label_down_colour;
             break;
         }

         switch (alpha) {
         case 000:
             gr.DrawImage(this.img_displayed, this.x, this.y, this.w, this.h, 0, 0, this.w, this.h, 0, 255);
             break;
         case 100:
             gr.DrawImage(this.img_displayed, this.x, this.y, this.w, this.h, 0, 0, this.w, this.h, 0, 060);
             break;
         case 888:
             gr.DrawImage(this.img_displayed, this.x, this.y, this.w, this.h, 0, 0, this.w, this.h, 0, 215 + this.g_timer_counter * 04);
             break;
         case 999:
             gr.DrawImage(this.img_displayed, this.x, this.y, this.w, this.h, 0, 0, this.w, this.h, 0, 175 + this.g_timer_counter * 08);
             break;
         default:
             gr.DrawImage(this.img_displayed, this.x, this.y, this.w, this.h, 0, 0, this.w, this.h, 0, 115 + this.g_timer_counter * 14);
             break;
         }

         if (label != "") {
             gr.SetTextRenderingHint(3);
             gr.DrawString(label, this.font, this.label_colour, bx + 7, by - 1, gr.MeasureString(label, this.font, 0, 0, 250, 250).Width, gr.MeasureString(label, this.font, 0, 0, 250, 250).Height, l_stringformat);
         }

     }

     this.checkstate = function (event, x, y, id) {
         if (x > this.x && x < this.x + this.w - 1 && y > this.y && y < this.y + this.h - 1) {
             this.is_hover = true;
             this.mousecursor = 32649;
         } else {
             this.is_hover = false;
             this.mousecursor = 32512;
         }

         switch (event) {
         case "down":
             if (this.is_hover) {
                 this.state = this.ButtonStates.down;
             } else if (this.state == this.ButtonStates.down) {
                 this.state = this.ButtonStates.normal;
                 this.g_timer && window.KillTimer(this.g_timer);
                 this.g_timer_sens = 0;
                 this.g_timer = window.CreateTimerInterval(40);
             }

             break;
         case "right":
             if (this.is_hover) {
                 display_context_menu(x, y, id);
             }

             break;
         case "move":
             if (this.is_hover) {
                 if (this.state != this.ButtonStates.down) {
                     if (this.state != this.ButtonStates.hover) {
                         this.g_timer_sens = 1;
                         this.g_timer && window.KillTimer(this.g_timer);
                         this.g_timer = window.CreateTimerInterval(40);
                         this.state = this.ButtonStates.hover;
                     }

                 }

             } else if (this.state == this.ButtonStates.hover) {
                 this.state = this.ButtonStates.normal;
                 this.g_timer && window.KillTimer(this.g_timer);
                 this.g_timer_sens = 0;
                 this.g_timer = window.CreateTimerInterval(40)
             }

             break;
         case "up":
             if (this.is_hover) {
                 if (this.state == this.ButtonStates.down) {
                     this.state = this.ButtonStates.hover;
                 } else {
                     this.state = this.ButtonStates.normal;
                     this.g_timer && window.KillTimer(this.g_timer);
                     this.g_timer_sens = 0;
                     this.g_timer = window.CreateTimerInterval(40);
                 }

             } else {
                 this.state = this.ButtonStates.normal;
                 this.g_timer && window.KillTimer(this.g_timer);
                 this.g_timer_sens = 0;
                 this.g_timer = window.CreateTimerInterval(40);
             }

             break;
         case "leave":
             this.state = this.ButtonStates.normal;
             this.g_timer && window.KillTimer(this.g_timer);
             this.g_timer_sens = 0;
             this.g_timer = window.CreateTimerInterval(40);
             break;
         }

         if (this.y >= 0) {
             this.is_hover && window.RepaintRect(this.x, this.y, this.w + 1, this.h + 1);
         }

         return this.state;
     }

 }

 var vb = {};
 vb.Function = function (func) {
     return function () {
         return vb.Function.eval.call(this, func, arguments);
     }

 };
 vb.Function.eval = function (func) {
     var args = Array.prototype.slice.call(arguments[1]);
     for (var i = 0;
     i < args.length;
     i++) {
         if (typeof args[i] != 'string') {
             continue;
         }

         args[i] = '"' + args[i].replace(/"/g, '" + Chr(34) + "') + '"';
     }

     var vbe;
     vbe = new ActiveXObject('ScriptControl');
     vbe.Language = 'VBScript';
     return vbe.eval(func + '(' + args.join(', ') + ')');
 };
 var InputBox = vb.Function('InputBox');
 var MsgBox = vb.Function('MsgBox');
 vb.OKOnly = 0;
 vb.OKCancel = 1;
 vb.AbortRetryIgnore = 2;
 vb.YesNoCancel = 3;
 vb.YesNo = 4;
 vb.RetryCancel = 5;
 vb.Critical = 16;
 vb.Question = 32;
 vb.Exclamation = 48;
 vb.Information = 64;
 vb.DefaultButton1 = 0;
 vb.DefaultButton2 = 256;
 vb.DefaultButton3 = 512;
 vb.DefaultButton4 = 768;
 vb.ApplicationModal = 0;
 vb.SystemModal = 4096;
 vb.OK = 1;
 vb.Cancel = 2;
 vb.Abort = 3;
 vb.Retry = 4;
 vb.Ignore = 5;
 vb.Yes = 6;
 vb.No = 7;
 var ForReading = 1;
 var ForWriting = 2;
 var ForAppending = 8;
 var IDC_ARROW = 32512;
 var IDC_IBEAM = 32513;
 var IDC_HAND = 32649;
 var DT_LEFT = 0x00000000;
 var DT_RIGHT = 0x00000002;
 var DT_TOP = 0x00000000;
 var DT_CENTER = 0x00000001;
 var DT_VCENTER = 0x00000004;
 var DT_WORDBREAK = 0x00000010;
 var DT_SINGLELINE = 0x00000020;
 var DT_CALCRECT = 0x00000400;
 var DT_NOPREFIX = 0x00000800;
 var DT_EDITCONTROL = 0x00002000;
 var DT_END_ELLIPSIS = 0x00008000;
 var ButtonStates = {
     normal: 0,
     hover: 1,
     down: 2
 };
 var ColorTypeCUI = {
     text: 0,
     selection_text: 1,
     inactive_selection_text: 2,
     background: 3,
     selection_background: 4,
     inactive_selection_background: 5,
     active_item_frame: 6
 };

 function RGB(r, g, b) {
     return (0xff000000 | (r << 16) | (g << 8) | (b))
 }

 function RGBA(r, g, b, a) {
     return ((a << 24) | (r << 16) | (g << 8) | (b))
 }

 function getAlpha(color) {
     return ((color >> 24) & 0xff);
 }

 function getRed(color) {
     return ((color >> 16) & 0xff);
 }

 function getGreen(color) {
     return ((color >> 8) & 0xff);
 }

 function getBlue(color) {
     return (color & 0xff);
 }

 function StringFormat() {
     var h_align = 0,
         v_align = 0,
         trimming = 0,
         flags = 0;
     switch (arguments.length) {
     case 3:
         trimming = arguments[2];
     case 2:
         v_align = arguments[1];
     case 1:
         h_align = arguments[0];
         break;
     default:
         return 0;
     }

     return ((h_align << 28) | (v_align << 24) | (trimming << 20) | flags);
 }

 function Format_hms(t) {
     var hms;
     if (t) {
         switch (t.length) {
         case 4:
             hms = "00:0" + t;
             break;
         case 5:
             hms = "00:" + t;
             break;
         case 7:
             hms = "0" + t;
             break;
         default:
             hms = t;
             break;
         }

         return hms;
     } else {
         return "00:00:00";
     }

 }

 function num(strg, nb) {
     var i;
     var str = strg.toString();
     var k = nb - str.length;
     if (k > 0) {
         for (i = 0;
         i < k;
         i++) {
             str = "0" + str;
         }

     }

     return str.toString();
 }

 function decode_colour(opt_colour, resultype) {
     var XYZ_colour = {
         RGBcolour: 0,
         H: 0,
         S: 0,
         L: 0
     };
     var R_read, G_read, B_read;
     switch (resultype) {
     case 1:
         switch (opt_colour.length) {
         case 23:
             XYZ_colour.H = Math.round(opt_colour.substring(0, 3));
             XYZ_colour.S = Math.round(opt_colour.substring(4, 7));
             XYZ_colour.L = Math.round(opt_colour.substring(8, 11));
             XYZ_colour.RGBcolour = HSL2RGB(XYZ_colour.H, XYZ_colour.S, XYZ_colour.L, "RGB");
             break;
         default:
             XYZ_colour.H = 0;
             XYZ_colour.S = 0;
             XYZ_colour.L = 0;
             XYZ_colour.RGBcolour = RGB(0, 0, 0);
         }

         return XYZ_colour;
         break;
     default:
         switch (opt_colour.length) {
         case 23:
             R_read = Math.round(opt_colour.substring(12, 15));
             G_read = Math.round(opt_colour.substring(16, 19));
             B_read = Math.round(opt_colour.substring(20, 23));
             break;
         default:
             R_read = 0;
             G_read = 0;
             B_read = 0;
         }

         return RGB(R_read, G_read, B_read);
     }

 }

 function TrackType(trkpath) {
     var taggable;
     var type;
     switch (trkpath) {
     case "file":
         taggable = 1;
         type = 0;
         break;
     case "cdda":
         taggable = 1;
         type = 1;
         break;
     case "FOO_":
         taggable = 0;
         type = 2;
         break;
     case "http":
         taggable = 0;
         type = 3;
         break;
     case "mms:":
         taggable = 0;
         type = 3;
         break;
     case "unpa":
         taggable = 0;
         type = 4;
         break;
     default:
         taggable = 0;
         type = 5;
     }

     return type;
 }

 var StringAlignment = {
     Near: 0,
     Centre: 1,
     Far: 2
 };
 var l_stringformat = StringFormat(StringAlignment.Near, StringAlignment.Centre);
 var c_stringformat = StringFormat(StringAlignment.Centre, StringAlignment.Centre);
 var r_stringformat = StringFormat(StringAlignment.Far, StringAlignment.Centre);
 var lt_stringformat = StringFormat(StringAlignment.Near, StringAlignment.Near);
 var ct_stringformat = StringFormat(StringAlignment.Centre, StringAlignment.Near);
 var rt_stringformat = StringFormat(StringAlignment.Far, StringAlignment.Near);
 var lc_stringformat = StringFormat(StringAlignment.Near, StringAlignment.Centre);
 var cc_stringformat = StringFormat(StringAlignment.Centre, StringAlignment.Centre);
 var rc_stringformat = StringFormat(StringAlignment.Far, StringAlignment.Centre);
 var lb_stringformat = StringFormat(StringAlignment.Near, StringAlignment.Far);
 var cb_stringformat = StringFormat(StringAlignment.Centre, StringAlignment.Far);
 var rb_stringformat = StringFormat(StringAlignment.Far, StringAlignment.Far);

 function RefreshBG2() {
     if (fb.IsPlaying || fb.IsPaused) {
         fb.RunMainMenuCommand("Playback/Play or Pause");
         fb.RunMainMenuCommand("Playback/Play or Pause");
     } else {
         fb.RunMainMenuCommand("Playback/Play");
         fb.RunMainMenuCommand("Playback/Stop");
     }

     fb.RunMainMenuCommand("ELPlaylist/Refresh");
     fb.RunMainMenuCommand("EsPlaylist/Refresh");
 }