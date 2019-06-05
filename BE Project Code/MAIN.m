  function varargout = MAIN(varargin)
% MAIN MATLAB code for MAIN.fig
%      MAIN, by itself, creates a new MAIN or raises the existing
%      singleton*.
%
%      H = MAIN returns the handle to a new MAIN or the handle to
%      the existing singleton*.
%
%      MAIN('CALLBACK',hObject,eventData,handles,...) calls the local
%      function named CALLBACK in MAIN.M with the given input arguments.
%
%      MAIN('Property','Value',...) creates a new MAIN or raises the
%      existing singleton*.  Starting from the left, property value pairs are
%      applied to the GUI before MAIN_OpeningFcn gets called.  An
%      unrecognized property name or invalid value makes property application
%      stop.  All inputs are passed to MAIN_OpeningFcn via varargin.
%
%      *See GUI Options on GUIDE's Tools menu.  Choose "GUI allows only one
%      instance to run (singleton)".
%
% See also: GUIDE, GUIDATA, GUIHANDLES

% Edit the above text to modify the response to help MAIN

% Last Modified by GUIDE v2.5 24-May-2017 19:08:11

% Begin initialization code - DO NOT EDIT
gui_Singleton = 1;
gui_State = struct('gui_Name',       mfilename, ...
                   'gui_Singleton',  gui_Singleton, ...
                   'gui_OpeningFcn', @MAIN_OpeningFcn, ...
                   'gui_OutputFcn',  @MAIN_OutputFcn, ...
                   'gui_LayoutFcn',  [] , ...
                   'gui_Callback',   []);
if nargin && ischar(varargin{1})
    gui_State.gui_Callback = str2func(varargin{1});
end

if nargout
    [varargout{1:nargout}] = gui_mainfcn(gui_State, varargin{:});
else
    gui_mainfcn(gui_State, varargin{:});
end
% End initialization code - DO NOT EDIT


% --- Executes just before MAIN is made visible.
function MAIN_OpeningFcn(hObject, eventdata, handles, varargin)
% This function has no output args, see OutputFcn.
% hObject    handle to figure
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)
% varargin   command line arguments to MAIN (see VARARGIN)

% Choose default command line output for MAIN
handles.output = hObject;

% Update handles structure
guidata(hObject, handles);

% UIWAIT makes MAIN wait for user response (see UIRESUME)
% uiwait(handles.figure1);


% --- Outputs from this function are returned to the command line.
function varargout = MAIN_OutputFcn(hObject, eventdata, handles) 
% varargout  cell array for returning output args (see VARARGOUT);
% hObject    handle to figure
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Get default command line output from handles structure
varargout{1} = handles.output;


% --- Executes on button press in RECOGNITION.
function RECOGNITION_Callback(hObject, eventdata, handles)
% hObject    handle to RECOGNITION (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)
global fln
TestImage=fln;
TrainDatabasePath = 'C:\Users\Me\Desktop\project\project\traindatabse\';
T = CreateDatabase(TrainDatabasePath);
[m, A, Eigenfaces] = EigenfaceCore(T);
[OutputName,Recognized_index] = Recognition(TestImage, m, A, Eigenfaces);
SelectedImage = strcat(TrainDatabasePath,  OutputName);
SelectedImage = imread(SelectedImage);
axes(handles.axes3);
imshow(SelectedImage);



% --- Executes on button press in CREATE_DATABASE.
function CREATE_DATABASE_Callback(hObject, eventdata, handles)
mkdir('C:\Users\Me\Desktop\project\project\traindatabse');
for j=1:3
    
axes(handles.axes1);
vid=videoinput('winvideo');
vidres=get(vid,'VideoResolution');
nband=get(vid,'NumberOfBands');
himage=image(zeros(vidres(2),vidres(1),nband));
preview(vid,himage);

img=getsnapshot(vid);
img=rgb2gray(img);
img1=imadjust(img);
axes(handles.axes2);
imshow(img);

faceDetector = vision.CascadeObjectDetector; 
bbox = step(faceDetector, img); 

hold on
for i=1:size(bbox,1)
    rectangle('position',bbox(i,:),'Linewidth',5,'Linestyle','-','Edgecolor','r');
end
hold off

N=size(bbox,1);
counter=1;
for i=1:N
    face=imcrop(img1,bbox(i,:));
    axes(handles.axes3);
    imshow(face);
   
    bdir='C:\Users\Me\Desktop\project\project\traindatabse\';
    nwnm=[bdir,num2str(counter),'.jpg'];
    while exist(nwnm,'file')
        counter=counter+1;
        nwnm=[bdir,num2str(counter),'.jpg'];
    end
    face=imresize(face,[240,320]);
    imwrite(face,nwnm);
     pause(1);
end
delete(vid);
end

% hObject    handle to CREATE_DATABASE (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)





% --- Executes during object creation, after setting all properties.
function figure1_CreateFcn(hObject, eventdata, handles)
% hObject    handle to figure1 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    empty - handles not created until after all CreateFcns called


% --- Executes on button press in TEST_IMAGE.
function TEST_IMAGE_Callback(hObject, eventdata, handles)
% hObject    handle to TEST_IMAGE (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA[)
global fln
[fn pn]=uigetfile('*.jpg;*.png;*.*');
fln=[pn,fn];
ad=imread(fln);
axes(handles.axes1);
imshow(ad);

% --------------------------------------------------------------------
function PREVIEW_Callback(hObject, eventdata, handles)
% hObject    handle to PREVIEW (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)
axes(handles.axes1);
vid=videoinput('winvideo');
vidres=get(vid,'VideoResolution');
nband=get(vid,'NumberOfBands');
himage=image(zeros(vidres(2),vidres(1),nband));
preview(vid,himage);
pause(5);
delete(vid);