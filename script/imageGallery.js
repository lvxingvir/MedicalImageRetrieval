/**
 * Created by Administrator on 2016/7/5.
 */
$(document).ready(function(){
    //�����ʼ�����϶�����ͼƬ��С�¼�
    d3.select('#slider').call(d3.slider().value(15).on("slide", function(evt, value) {
        var intValue=Math.floor(value);
        var changeValue=(intValue-15)*4.75;
        var newHeight=100+changeValue;
        //ֻ���չʾ�е�ͼƬ���������������ҳ�е�ͼƬ
        $("#mainContent img").css({"height":newHeight});
    }));

    //��������ģʽ�л��¼�
    $("#orderMode").click(function(){
        if($(this).hasClass("impact")){
            $(this).text("Random");
            $(this).removeClass("impact");
            $(this).parent("span").next().attr("placeholder","Keywords or PMCID (e.g. PMC395763), Ordered by Random");
        }else{
            $(this).text("Impact");
            $(this).addClass("impact");
            $(this).parent("span").next().attr("placeholder","Keywords or PMCID (e.g. PMC395763), Ordered by Impact");
        }
    })

    //ͼƬչʾģʽ�л��¼�
    $("#imagestyle img").click(function(){
        $(this).addClass("selected").siblings().removeClass("selected");
        $index=$(this).index();
        $("#mainContent>section").eq($index).show().siblings("section").hide();
    })

    //��������ɸѡͼƬ�¼�
    $("input[type='checkbox']").click(function(){
        $imageType=$(this).parent("div").attr("id");
        if($(this).attr("checked")){
            $(this).attr("checked",false);
            //ֻ����б��е�ͼƬ
            $("#mainContent img."+$imageType).hide();
        }else{
            $(this).attr("checked",true);
            $("#mainContent img."+$imageType).show();
        }
    })

    //�鿴����ժҪ�¼�
    $("#viewAbstract").click(function(){
        if($("#paperAbstract").is(":hidden")){
            $("#paperAbstract").show();
            $(this).text("Hide Abstract");
        }else{
            $("#paperAbstract").hide();
            $(this).text("View Abstract");
        }
    })

    //�鿴��������ͼƬ�¼�
    $("#showOtherImage").click(function(){
        if($("#otherImage").is(":hidden")){
            $("#otherImage").show();
            $(this).text("Hide Other Figures");
        }else{
            $("#otherImage").hide();
            $(this).text("Show Other Figures");
        }
    })

    //�鿴�������ͼƬ�¼�
    $("#showRelatedImage").click(function(){
        if($("#relatedImage").is(":hidden")){
            $("#relatedImage").show();
            $(this).text("Hide Related Figures");
        }else{
            $("#relatedImage").hide();
            $(this).text("Show Related Figures");
        }
    })

    //�ر���������ҳ�¼�
    $("#close").click(function(){
        $("#paperDetail").removeClass();
        if(!$("#paperAbstract").is(":hidden")){
            $("#viewAbstract").trigger("click");
        }
        if(!$("#otherImage").is(":hidden")){
            $("#showOtherImage").trigger("click");
        }
        if(!$("#relatedImage").is(":hidden")){
            $("#showRelatedImage").trigger("click");
        }
        $("#paperDetail").hide();
        $("#mainContent").show();
    })

    //����������ҳ�¼���������Ҫ�ڴ�ʱ����json����
    // �������ݿ��Դ�ǰ̨���룬ͼƬ��Ӧ�������ߣ��ڿ�ժҪ������ͼƬ�����ͼƬ��Ϣ��Ҫ�Ӻ�̨����
    $("#mainContent img").click(function(){
        var $fullPaper;//pdf�ļ���Դ
        var $src=$(this).attr("src");//��ȡ��Ӧ�����ͼƬ
        var $type=$(this).attr("class");//��ȡͼƬ����
        $("#paperDetail").addClass($type);//���򿪵����Ŀ򸳶�Ӧ����������ʾ��ͬ��ɫ�߿�
        $("#paperDetail #taggerArea #taggerType").html($type+" <span class='caret'></span>");//����ͼƬ��𸳳�ʼ��ע���
        $("#paperDetail #selectedImage").attr("src",$src);//��������ͼƬ
        $("#viewFullPaper").attr("href",$fullPaper);//��pdf.js��ָ��ȫ��·��
        $("#mainContent").hide();
        $("#paperDetail").show();
    })

    //��עͼƬ�����¼�
    $("#taggerSelected li").click(function(){
        var $selectedType=$(this).find("a").text();
        $("#paperDetail #taggerArea #taggerType").html($selectedType+" <span class='caret'></span>");
    })

    //�ύ��ע����¼�
    $("#taggerSubmit").click(function(){
        $("#taggerArea input[type='text']").attr("placeholder","Tagged! Thank you.")
    })

    //���������¼�
    var loading=false;
    $(document).scroll(function(){
        if ($(this).scrollTop() + window.innerHeight >= $(document).height() && $(this).scrollTop() > 0){
            if(loading) return;
            loading = true;
            setTimeout(function() {
                //�������ʾ������Ҫ�Ӻ�̨����json���ݣ�ƴ���ַ�������
                if($("#imagestyle img").eq(0).hasClass("selected")){
                    $("#waterfall").append("<p>�����¼��ص�����</p>");
                }else{
                    $("#imageList").append("<p>�����¼��ص�����</p>");
                }
                loading = false;
            }, 1000);   //ģ���ӳ�
        }
    })
})
