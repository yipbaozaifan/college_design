<template>
	<navbar placement="top" type="default">
  		<!-- Brand as slot -->
  	  <a slot="brand" href="/" title="Home" class="navbar-brand">VueStrap</a>
  		<!-- You can use dropdown component -->
  		<!-- For right positioning use slot -->
  	  <li>
  	  	<a v-link="{path:'/create'}" class="nav_btn">创建问卷</a>
  	  </li>
  	  <li>
  	  	<a v-link="{path:'/mysurvey'}" class="nav_btn">我的问卷</a>
  	  </li>
	  <li slot="right" id="nav_userbar">
	    <img src="../img/boy.png" class="navbar_head"><span class="navbar_name">野仔湛</span><span id="splitor">|</span><a id="nav_exit_btn">退出</a>
	  </li>
	</navbar>
	<div class="sub_header">
		<div class="sub_header_content">
			<div class="sub_nav">
				<a class="sub_nav_item" v-on:click="go_edit()">编辑问卷</a>
				<a class="sub_nav_item">选择背景</a>
				<a class="sub_nav_item current" href="">统计分析</a>
			</div>
		</div>
	</div>
	<div class="analyze_warp">
		<div class="analyze_content">
			<div class="analyze_main">
				<div class="analyze_main_content">
					<div id="analyze_overview" v-if="now_tab==1">
						<div class="overview_warp">
							<div class="overview_modules">
								<div class="overview_module">
									<div class="overview_module_inner">
										<h4 class="module_title">问卷浏览量</h4>
										<p class="module_data">
											<span class="module_data_number">2</span>
										</p>
										<p class="adding_word">问卷实时访问量</p>
									</div>
								</div>
								<div class="overview_module">
									<div class="overview_module_inner">
										<h4 class="module_title">问卷填写量</h4>
										<p class="module_data">
											<span class="module_data_number">{{target.length}}</span>
										</p>
										<p class="adding_word">问卷实时回收量</p>
									</div>
								</div>
								<div class="overview_module">
									<div class="overview_module_inner">
										<h4 class="module_title">回收率</h4>
										<p class="module_data">
											<span class="module_data_number">33%</span>
										</p>
										<p class="adding_word">回收率=回收量/浏览量</p>
									</div>
								</div>
								<div class="overview_module">
									<div class="overview_module_inner">
										<h4 class="module_title">平均完成时间</h4>
										<p class="module_data">
											<span class="module_data_number">5</span>
											<span>分</span>
											<span class="module_data_number">10</span>
											<span>秒</span>
										</p>
										<p class="adding_word"></p>
									</div>
								</div>
							</div>
						</div>  
					</div>
					<div id="analyze_recycle" v-if="now_tab==0">
						<div class="recycle_filter">
							<div class="legend">
								<span class="title">{{now_survey.survey_name}}</span>
								<span class="id">ID:{{now_survey._id}}</span>
							</div>
							<div class="info">
								<a class="info_icon" id="refresh_data">
									<i class="refresh_icon"></i>
								</a>
								<a class="info_icon delete_answer_btn" id="delete_answer">
									<i class="del_icon"></i>
								</a>
							</div>
						</div>
						<div class="table">
							<div class="data_table_warpper">
								<table id="recycle_table">
									<thead>
										<tr>
											<th class="input_th">
												<input type="checkbox" name="delete_checkbox_all" id="delete_checkbox_all" class="survey_form_checkbox">
												<label for="delete_checkbox_all" class="del_input_label">
													<i class="survey_form_ui"></i>
												</label>
											</th>
											<th>编号</th>
											<th>开始答题时间</th>
											<th>结束答题时间</th>
											<th  v-for="item in questions">
												<span>{{item.title}}</span>
											</th>
										</tr>
									</thead>
									<tbody id="list">
										<tr v-for = 'item in target'>
											<td class="input_td">
												<input class="survey_form_checkbox" type="checkbox" name="delete_checkbox">
											</td>
											<td>{{$index+1}}</td>
											<td>{{item.start_time}}</td>
											<td>{{item.end_time}}</td>
											<template v-for = 'answer in answers'>
												<td v-if = 'answer.target==item._id'>
													{{answer.values}}
												</td>
											</template>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div id="analyze_chart" v-if="now_tab==2">
						<div class="chart_filter">
							<div class="legend">
								<span class="title">{{now_survey.survey_name}}</span>
								<span class="id">ID:{{now_survey._id}}</span>
							</div>
						</div>
						<div id="chart">
							<div class="survey_pages_tab">
								<a class="pages_preview" v-on:click="_preview($event)">
									<i> < </i>
								</a>
								<div class="pages_warp">
									<ul id="pages_list">
										<li v-for = "i in questions" class="pages_item" v-bind:class="{'current':now_page==($index+1)}" v-on:click = "changePage($index+1)">
											<span>第{{$index+1}}题</span>
										</li>
									</ul>
								</div>
								<a class="pages_next" v-on:click="_next($event)">
									<i> > </i>
								</a>
							</div>
							<div class="question_panel">
								<div class="graph_types">
									<span  class="graph_type" v-on:click = "change_graph_type(0)" v-bind:class="{'active':graph_type==0}">
										<i class="ico ico_answers"></i>回答概况
									</span>
									<span  class="graph_type" v-on:click = "change_graph_type(1)" v-bind:class="{'active':graph_type==1}">
										<i class="ico ico_pie"></i>饼状图
									</span>
									<span  class="graph_type" v-on:click = "change_graph_type(2)" v-bind:class="{'active':graph_type==2}">
										<i class="ico ico_column"></i>柱状图
									</span>
								</div>
								<div class="question_title">问题标题</div>
								<div class="graph_warp">
									<div id="graph_pie" v-show='graph_type==1'>
										<svg width="100%" height="100%"></svg>
									</div>
									<div id="graph_column" v-show='graph_type==2'>
										<svg width="100%" height="100%"></svg>
									</div>
								</div>
								<div class="answers_warp" v-if = 'graph_type==0'>
									<div id = "table_warp">
										<div class="data_table_warpper">
											<table class="data_table" v-if='questions[now_page].type == "radio"||questions[now_page].type=="checkbox"'>
												<thead>
													<tr role="row">
														<th class="table_title">选项</th>
														<th class="table_value">小计</th>
														<th class="table_value">百分比</th>	
													</tr>
												</thead>
												<tbody>
													<tr class="" v-for="item in questions[now_page].options">
														<td class="table_title">{{item.value}}</td>
														<td class="table_value">{{item.count}}</td>
														<td class="table_value">{{item.count*1.0/target.length*100}}%</td>
													</tr>
												</tbody>
											</table>
											<table class="data_table" v-else>
												<thead>
													<tr role="row">
														<th class="table_answer">回答</th>	
													</tr>
												</thead>
												<tbody>
													<tr class="" v-for="item in answers">
														<td class="table_answer" v-if="item.type=='text'">{{item.value[0]}}</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="analyze_sidebar">
				<ul>
					<li class="sidebar_item current">
						<a class="iconLink overview_ico" v-on:click = 'change_tab(1)'>
							<div class="icon">
								<i class="needle"></i>
							</div>
							<div class="wording">问卷概况</div>
						</a>
					</li>
					<li class="sidebar_item">
						<a class="iconLink recycle_ico" v-on:click = 'change_tab(0)'>
							<div class="icon">
								<i class="recycle_inner_line recycle_inner_line_1"></i>
								<i class="recycle_inner_line recycle_inner_line_2"></i>
								<i class="recycle_inner_line recycle_inner_line_3"></i>
							</div>
							<div class="wording">样本数据</div>
						</a>
					</li>
					<li class="sidebar_item">
						<a class="iconLink chart_ico" v-on:click = 'change_tab(2)'>
							<div class="icon">
								<i class="left_fan recycle_fan"></i>
								<i class="right_fan recycle_fan"></i>
								<i class="bg_fan recycle_fan"></i>
							</div>
							<div class="wording">统计图表</div>
						</a>
					</li>
				</ul>
			</div>
		</div>	
	</div>
	<backtop></backtop>
</template>

<script>
	import api from '../tools/api/dataApi.js';
	import backtop from '../components/backTop.vue';
	import {navbar} from 'vue-strap';
	import {modal} from 'vue-strap';
	export default {
		components: {
	      backtop,
	      navbar,
	      modal
    	},
		data(){
			return{
				login_user:{},
				now_survey:{},
				questions:[], 
				now_tab:0,
				graph_type:0,
				now_page:1,
				page_index:1,
				timer:null,
				target:[],
				answers:[],
				flag:false
			}
		},  
		methods:{
			go_edit(){
				var user_id = this.login_user.user.user_id;
				var survey_id = this.now_survey._id;
				this.$router.go({name:'edit',params:{user_id:user_id,survey_id:survey_id}});
			},
			//左边栏
			change_tab(i){
				if(i==2&&!this.flag){
					this._deal();
					this.flag = true;
				}
				this.now_tab = i;
			},
			//切换数据展示方式
			change_graph_type(i){
				this.graph_type = i;
				switch(i){
					case 0 :{
						break;
					}
					case 1:{
						//饼状图
						this._clear(i);
						this._draw_pie(this.now_page);
						break;
					}
					case 2:{
						//柱形图
						this._clear(i);
						this._draw_column(this.now_page);
						break;
					}
				}
			},
			//切换问题
			changePage(index){
				if(index==this.now_page){
					return false;
				}else{
					this.now_page = index;
					this.graph_type = 0;		
				}
			},
			_preview(e){
				var pages_bar = document.querySelector('#pages_list');
				var current_position = (this.page_index-1)*96;
				if(current_position-96<0){
					pages_bar.style.left = 0;
				}else{
					this.page_index -= 2;
					pages_bar.style.left = '-'+this.page_index*96+'px';
				}
			},
			_next(e){
				var pages_bar = document.querySelector('#pages_list');
				var pages_warp_width= document.querySelector('.pages_warp').offsetWidth;
				var offset_width = pages_bar.offsetWidth;
				var current_position = this.page_index*96;
				if(offset_width-current_position<pages_warp_width){
					pages_bar.style.left = '-' + (offset_width-pages_warp_width) + 'px'
				}else{
					pages_bar.style.left = "-"+this.page_index*96 + 'px';
					this.page_index++;
				}
			},
			_deal(){
				for(let i = 0;i<this.questions.length;i++){
					if(this.questions[i].type=='radio'||this.questions[i].type=='checkbox'){
						for(let j=0;j<this.questions[i].options.length;j++){
							for(let k = 0;k<this.answers.length;k++){
								if(this.questions[i]._id == this.answers[k].question){
									this.answers[k].type = "choice";
									for(let l = 0;l<this.answers[k].values.length;l++){
										if(this.answers[k].values[l]===this.questions[i].options[j].value){
											this.questions[i].options[j].count++;
										}
									}
								}else{
									this.answers[k].type = 'text'
								}
							}
						}
					}
				}
			},
			_draw_pie(page){
				var width = 600, height = 300;
				console.log(d3);
  				// 创建一个分组用来组合要画的图表元素
  				var main = d3.select("#graph_pie svg").append('g')
  					.classed('main', true)
   					.attr('transform', "translate(" + width/2 + ',' + height/2 + ')');
  				console.log(main);
  				main.append('svg');
	   			var dataSet = this.questions[page].options;
	   			var sum = 0;
	   			var pie = d3.layout.pie()
				   .sort(null)
				   .value(function(d) {
				    return d.count;
				   });
				var pieData = pie(dataSet);
  				
  				var vm = this;
  				pieData.forEach(function(d,i){  
        			d._endAngle=d.endAngle;//保存这个值，后面动画要用到。  
        			d.endAngle=d.startAngle;//让每个弧的弧度都是0  
        			d.duration=2001*(d.data.count/vm.target.length);  
        			d.delaytime=sum;  
        			sum+=d.duration;  
  				})

  				var radius = 100;
  				var arc = d3.svg.arc()
   					.innerRadius(0)
   					.outerRadius(radius);
  				var outerArc = d3.svg.arc()
   					.innerRadius(1.2 * radius)
   					.outerRadius(1.2 * radius);
  				var oArc = d3.svg.arc()
   					.innerRadius(1.1 * radius)
   					.outerRadius(1.1 * radius);
  				var slices = main.append('g').attr('class', 'slices');
  				var lines = main.append('g').attr('class', 'lines');
  				var labels = main.append('g').attr('class', 'labels');
  				
  				var arcs = slices.selectAll('g')
       				.data(pieData)
       				.enter()
       				.append('path')
       				.attr('fill', function(d,i) {
           				return vm._get_color(i);
       				})
       				.attr('d', function(d){
            			return arc(d);
        			})
       				.transition()
       				.duration(function(d,i){
            			return d.duration;
      				 })
       				.ease("linear")
       				.delay(function(d,i){
            			return d.delaytime
       				})
       				.attrTween("d", vm.tweenArc(function(d, i) {  
            			return {  
                			startAngle: d.startAngle,     
                			endAngle: d._endAngle  
            			};  
        			},arc));
  				// 添加文字标签
  				var texts = labels.selectAll('text')
       				.data(pieData)
       				.enter()
       				.append('text')
       				.attr('dy', '0.35em')
       				.attr('fill', function(d, i) {
        				return vm._get_color(i);
       				})
       				.transition()
       				.duration(function(d,i){
            			return d.duration;
       				})
       				.ease("bounce")
       				.delay(function(d,i){
            			return d.delaytime
       				})
       				.text(function(d, i) {
        				return d.data.value;
       				})
       				.style('text-anchor', function(d, i) {
        				return vm._midAngel(d)<Math.PI ? 'start' : 'end';
       				})
       				.attr('transform', function(d, i) {
        			// 找出外弧形的中心点
        				var pos = outerArc.centroid(d);
        			// 改变文字标识的x坐标
        				pos[0] = radius * (vm._midAngel(d)<Math.PI ? 1.5 : -1.5);
        				return 'translate(' + pos + ')';
   					})
   					.style('opacity', 1);

				var polylines = lines.selectAll('polyline')
				   .data(pieData)
				   .enter()
				   .append('polyline')
				   .transition()
				   .duration(function(d,i){
				        return d.duration;
				    })
				   .delay(function(d,i){
				        return d.delaytime
				    })
				   .ease("bounce")
				   .attr('points', function(d) {
				    return [arc.centroid(d), arc.centroid(d), arc.centroid(d)];
				   })
				   .attr('points', function(d) {
				    var pos = outerArc.centroid(d);
				    pos[0] = radius * (vm._midAngel(d)<Math.PI ? 1.5 : -1.5);
				    return [oArc.centroid(d), outerArc.centroid(d), pos];
				   })
				   .style('opacity', 0.5);
			},
			_draw_column(page){

			},
			_get_color(index){
				var palette = [
			       '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
			       '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
			       '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
			       '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
			      ]
			    return palette[index % palette.length];
			},
			_midAngel(d){
				return d.startAngle + (d.endAngle - d.startAngle)/2;
			},
			tweenArc(b,arc) {  
        		return function(a, i) {  
            		var d = b.call(this, a, i),  
                	i = d3.interpolate(a, d);  
            		return function(t) {  
                		return arc(i(t));  
            		};  
        		}  
    		},
    		_clear(i){
    			var svg = null;
    			switch(i){
    				case 1:{
    					svg = document.querySelector('#graph_pie svg');
    					svg.innerHTML = "";
    					break;
    				}
    				case 2:{
    					svg = document.querySelector("#graph_column svg");
    					svg.innerHTML = "";
    					break;
    				}
    			}
    		}
		},
		route:{
			activate(){
				//console.log(document.querySelector(".graph_pie"));
				var current_survey = this.$route.params.survey_id;
				var vm = this;
				this.$http.get('/analyze_catch',{
					params:{
						survey_id : current_survey
					}
				}).then(function(res){
					var data = res.data.data[0];
					this.now_survey = data.survey;
					this.questions = data.questions;
					this.target = data.target;
					this.answers = data.answers;
					this.questions.forEach(function(d,i){
						d.count = 0;
					})
					this.answers.forEach(function(d,i){
						d.type = "type";
					})
					for(var i = 0;i<this.questions.length;i++){
						this.questions[i].options.forEach(function(d,i){
							d.count = 0;
						});
					}
				},function(err){
					console.log('error');
				})
			}
		}
	}
</script>

<style type="text/css">
	ul{
		margin: 0;
		padding: 0;
	}
	h2{
		color:#fff;
	}
	@keyframes needle{
		0% {
    		transform: rotate(0deg);
  		} 
	  	25% {
	    	transform: rotate(25deg);
	  	}
	  	50% {
	    	transform: rotate(-15deg);
	  	}
	  	75% {
	    	transform: rotate(10deg);
	  	}
	  	100% {
	    	transform: rotate(0deg);
	  	}
	}
	@keyframes recycleline{
		0%{width: 14px;}
		100%{width: 0px;}
	}
	@keyframes rightfan{
		0%{
			transform: rotate(70deg);
		}
		50%{
			transform: rotate(140deg);
		}
		100%{
			transform: rotate(0deg);
		}
	}
	.analyze_warp{
		height: 100%;
		background-color: #f0f0f0;
		padding-top: 50px;
	}
	.analyze_content{
		height: 100%;
	}
	.analyze_main{
		float: left;
		height: 100%;
		width: 100%;
	}
	.analyze_main_content{
		margin-left: 130px;
		height: 100%;
	}
	.analyze_sidebar{
		float: left;
		height: 100%;
		background-color: #fafafa;
		width: 130px;
		margin-left:-100%; 
		border-right: 1px solid #e0e0e0;
		padding-top:14px; 
	}
	.sidebar_item{
		text-align: center;
		display: block;
		cursor: pointer;
		padding: 15px 0;
	}
	.sidebar_item .iconLink{
		display: block;
		width: 50%;
		margin:0 auto;
		position: relative;
	}
	.sidebar_item .iconLink .icon{
		margin: 0 auto 5px auto;
		background-image: url(../img/sprites_ico.png);
	}
	/*overview hover*/
	.sidebar_item:hover .overview_ico .icon{
		background-position: -215px -529px;
	}
	.sidebar_item:hover .overview_ico .icon .needle{
		background-position: -137px -529px;
		animation: needle 1s linear infinite alternate;
	}
	/*overview hover end*/
	/*recycle hover*/
	.sidebar_item:hover .recycle_ico .icon{
		background-position: -492px -488px;
	}
	.sidebar_item:hover .recycle_ico .icon .recycle_inner_line{
		background-color: #58a6e7;
		animation: recycleline 0.6s linear infinite alternate;
	}
	.sidebar_item:hover .recycle_ico .icon .recycle_inner_line.recycle_inner_line_1{
		animation-delay: 0s;
	}
	.sidebar_item:hover .recycle_ico .icon .recycle_inner_line.recycle_inner_line_2{
		animation-delay: 0.2s;
	}
	.sidebar_item:hover .recycle_ico .icon .recycle_inner_line.recycle_inner_line_3{
		animation-delay: 0.4s;
	}
	/*recycle hover end*/
	/*chart hover*/
	.sidebar_item:hover .chart_ico .icon {
		border-color: #58a6e7;
	}
	.sidebar_item:hover .chart_ico .icon .bg_fan{
		background-color: #58a6e7;
	}
	.sidebar_item:hover .chart_ico .icon .right_fan{
		animation: rightfan 2s linear infinite alternate;
	}
	/*chart hover end*/
	/*overview*/
	.sidebar_item .overview_ico .icon{
		background-position: -176px -529px;
		width: 38px;
		height: 38px;
		position: relative;
	}
	.sidebar_item.current .overview_ico .icon{
		background-position: -215px -529px;
	}
	.sidebar_item .overview_ico .icon .needle{
		display: block;
		background-image: url(../img/sprites_ico.png);
		background-position: -137px -529px;
		position: absolute;
		top: 0;
		left: 0;
		width: 38px;
		height: 38px;
	}
	.sidebar_item.current .overview_ico .icon .needle{
		background-position: -137px -529px;
	}
	.overview_warp{
		height: 100%;
	}
	#analyze_overview{
		width: 88%;
		height: 100%;
		margin: 0px auto;
	}
	#analyze_overview .overview_warp .overview_modules{
		display: flex;
		height: 100%;
		justify-content: space-around;
		align-items: center;
		align-content: space-around;
		flex-wrap: wrap;
	}
	#analyze_overview .overview_warp .overview_modules .overview_module{
		height: 200px;
		flex-shrink: 0;
		flex-basis: 48%;
		background-color: #fff;
		border:1px solid #e7e7e7;
		box-shadow: 1px 2px 2px #e7e7e7;
	}
	#analyze_overview .overview_warp .overview_modules .overview_module .overview_module_inner{
		margin:20px;
	}
	#analyze_overview .module_title{
		color: #333;
		font-size: 14px;
	}
	#analyze_overview .module_data{
		margin-top: 40px;
		font-size: 12px;
		text-align: center;
		color: #333;
	}
	#analyze_overview .module_data .module_data_number{
		font-size: 37px;
		line-height: 37px;
	}
	#analyze_overview .adding_word{
		text-align: center;
		font-size: 12px;
		color: #999;
		margin-top: 4px;
	}
	/*overview end*/
	/*recycle*/
	.sidebar_item .recycle_ico .icon{
		background-position: -375px -488px;
		width: 38px;
		height: 38px;
		position: relative;
	}
	.sidebar_item .recycle_ico .icon .recycle_inner_line{
		display: block;
		height: 3px;
		width: 14px;
		border-radius: 3px;
		position: absolute;
		background-color: #999;
		left: 50%;
		margin-left:-7px; 
	}
	.sidebar_item .recycle_ico .icon .recycle_inner_line.recycle_inner_line_1{
		top:15px;
	}
	.sidebar_item .recycle_ico .icon .recycle_inner_line.recycle_inner_line_2{
		top:20px;
	}
	.sidebar_item .recycle_ico .icon .recycle_inner_line.recycle_inner_line_3{
		top:25px;
	}
	#analyze_recycle{
		background-color: #fff;
		border:1px solid #ddd;
		min-height: 500px;
		position: relative;
		width: 94%;
		margin: 30px auto 0 auto;
	}
	#analyze_recycle .recycle_filter{
		padding: 20px;
		position: relative;
	}
	#analyze_recycle .recycle_filter .legend{
		margin-bottom: 20px;
	}
	#analyze_recycle .recycle_filter .legend .title{
		font-size: 20px;
	}
	#analyze_recycle .recycle_filter .legend .id{
		margin-left: 10px;
		font-size: 14px;
		color: #999;
	}
	#analyze_recycle .recycle_filter .info{
		position: absolute;
		top: 20px;
		right: 20px;
	}
	#analyze_recycle .recycle_filter .info .info_icon{
		display: block;
		text-align: center;
		width: 38px;
		height: 38px;
		position: relative;
	}
	#analyze_recycle .recycle_filter .info a{
		float: left;
		margin-left:12px;
		border:1px solid #d6d6d6;
		font-size: 14px;
		cursor: pointer; 
	}
	#analyze_recycle .recycle_filter .info .refresh_icon{
		background-image: url(../img/sprites_ico.png);
		background-position: 0px -619px;
		display: block;
		width: 22px;
		height: 24px;
		position: absolute;
		left: 50%;
		top:50%;
		margin-left:-11px;
		margin-top: -12px;  
	}
	#analyze_recycle .recycle_filter .info .del_icon{
		background-image: url(../img/sprites_ico.png);
		background-position: -19px -664px;
		display: block;
		width: 18px;
		height: 20px;
		position: absolute;
		left: 50%;
		top:50%;
		margin-left:-9px;
		margin-top: -10px;  
	}
	#analyze_recycle .table{
		position: relative;
		display: block;
	}
	#analyze_recycle .data_table_warpper{
		margin: 0 20px 20px 20px;
		text-align: center;
		position: relative;
		z-index: 10;
		overflow-x: auto;
	}
	#recycle_table{
		min-width: 100%;
	}
	#analyze_recycle .data_table_warpper thead{
		position: sticky;	
	}
	#analyze_recycle .data_table_warpper thead th{
		color: #999;
		text-align: center;
		background-color: #fafafa;
		border-top: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
		padding: 15px 17px;
		font-size: 14px;
		white-space: nowrap;
		overflow: hidden;
		max-width: 200px;
		text-overflow: ellipsis;	
	}
	#analyze_recycle .data_table_warpper tbody td{
		font-size: 14px;
		text-align: center;
		color: #666;
		padding: 15px 27px 15px 17px;
		border-bottom: 1px solid #eee;
		position: relative;
		white-space: nowrap;
	}
	/*recycle end*/
	/*chart*/
	.sidebar_item .chart_ico .icon{
		box-sizing: content-box;
		background-image: none;
		border:2px solid #999;
		width: 30px;
		height: 30px;
		border-radius: 30px;
		margin-bottom: 8px;
		color: #fff;
		position: relative;
	}
	.sidebar_item .chart_ico .icon .recycle_fan{
		display: block;
		position: absolute;
	}
	.sidebar_item .chart_ico .icon .left_fan{
		left: 0px;
		top: 0px;
		width: 15px;
		height: 30px;
		border-radius: 30px 0 0 30px;
		background-color: #fafafa;
		z-index: 1;
	}
	.sidebar_item .chart_ico .icon .right_fan{
		left: 15px;
		top: 0px;
		width: 15px;
		height: 30px;
		border-radius:0 30px 30px 0px;
		background-color: #fafafa;
		z-index: 1;
		transform-origin: 0 50%;
		transform: rotate(70deg);
	}
	.sidebar_item .chart_ico .icon .bg_fan{
		left: -1px;
		top: -1px;
		width: 31px;
		height: 31px;
		border-radius: 31px;
		overflow: hidden;
		background-color: #999;
		z-index: 0;
	}
	#analyze_chart{
		background-color: #fff;
		border:1px solid #ddd;
		min-height: 500px;
		position: relative;
		width: 94%;
		margin: 30px auto 0 auto;
	}
	#analyze_chart .chart_filter{
		padding:20px;
	}
	#analyze_chart .chart_filter .legend{
		margin-bottom: 20px;
	}
	#analyze_chart .chart_filter .legend .title{
		font-size: 20px;
	}
	#analyze_recycle .chart_filter .legend .id{
		margin-left: 10px;
		font-size: 14px;
		color: #999;
	}
	#chart{
		position: relative;
		margin-top: 40px;
		border-top:1px solid #dadada;
		padding: 20px 20px;
		font-size: 14px;
		text-align: left;
		vertical-align: middle;
	}
	#chart .question_panel .question_title{
		font-size: 14px;
		margin: 15px 140px 15px 0;
		word-break: break-all;
		position: relative;
	}
	#chart .question_panel .graph_types{
		height: 37px;
		position: relative;
	}
	#chart .question_panel .graph_types .graph_type{
		float: left;
		font-size: 14px;
		padding: 7px 20px;
		margin-left: -1px;
		background-color: #fff;
		border: 1px solid #ddd;
		cursor: pointer;
	}
	#chart .question_panel .graph_types .graph_type.active{
		color: #fff;
	    background: #58a6e7;
	    position: relative;
	    border: 1px solid #2b8ee1;
	}
	#chart .question_panel .graph_types .graph_type .ico{
		display: inline-block;
		margin-right: 5px;
		vertical-align: middle;
		background-image: url(../img/sprites_ico.png);
		width: 18px;
		height: 18px;
	}
	#chart .question_panel .graph_types .graph_type .ico_answers{
		background-position: -404px -619px
	}
	#chart .question_panel .graph_types .graph_type .ico_pie{
		background-position: -351px -619px
	}
	#chart .question_panel .graph_types .graph_type .ico_column{
		background-position: -135px -644px
	}
	#chart .question_panel .answers_warp .data_table{
		width: 100%;
	}
	#chart .question_panel .answers_warp .data_table th{
		padding: 15px 17px;
		color: #999;
	    background-color: #fafafa;
	    border-top: 1px solid #ddd;
	    border-bottom: 1px solid #ddd;
	}
	#chart .question_panel .answers_warp .data_table th.table_title{
		width: 60%;
	}
	#chart .question_panel .answers_warp .data_table th.table_value{
		width: 20%;
	}
	#chart .question_panel .answers_warp .data_table tbody td{
		font-size: 14px;
	    color: #666;
	    padding: 15px 17px;
	    border-bottom: 1px solid #eee;
	}
	/*chart end*/
	/*SVG*/
	polyline {
  		fill: none;
  		stroke: #000000;
  		stroke-width: 2px;
  		stroke-dasharray: 5px;
  	}
  	#graph_pie{
  		margin: 30px auto;
  		width: 600px;
  		height: 300px;
  	}
</style>