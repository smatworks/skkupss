package net.smartworks.skkupss.model;

import net.smartworks.util.LocalDate;

public class ProductService{
	
	public static final String PSS_SPACE_VALUE = "valueSpace";
	public static final String PSS_SPACE_SERVICE = "serviceSpace";
	public static final String PSS_SPACE_BIZ_MODEL = "bizModelSpace";
	public static final String PSS_SPACE_PRODUCT_SERVICE = "productServiceSpace";
	public static final String PSS_SPACE_PRODUCT = "productSpace";
	public static final String PSS_SPACE_TOUCH_POINT = "touchPointSpace";
	public static final String PSS_SPACE_CUSTOMER = "customerSpace";
	public static final String PSS_SPACE_ACTOR = "actorSpace";
	public static final String PSS_SPACE_ACTOR_CVCA = "actorCvcaSpace";
	public static final String PSS_SPACE_SOCIETY = "societySpace";
	public static final String PSS_SPACE_CONTEXT = "contextSpace";
	public static final String PSS_SPACE_TIME = "timeSpace";
	public static final String PSS_SPACE_BUSINESS = "businessContext";
	public static final String PSS_SPACE_ENVIRONMENT = "environmentSpace";
	public static final String PSS_SPACE_VALUE_SERVICE = "valueServiceSpace";
	public static final String PSS_SPACE_VALUE_BIZ_MODEL = "valueBizModelSpace";
	public static final String PSS_SPACE_SERVICE_BIZ_MODEL = "serviceBizModelSpace";
	public static final String PSS_SPACE_VALUE_SERVICE_BIZ_MODEL = "valueServiceBizModelSpace";
	public static final String PSS_SPACE_COMPLEX = "complexSpace";
	
	public static final String FIELD_ID 				= "id";	
	public static final String FIELD_NAME 				= "name";
	public static final String FIELD_PICTURE 			= "picture";
	public static final String FIELD_DESC 				= "desc";
	public static final String FIELD_LAST_MODIFIED_USER = "lastModifiedUser";
	public static final String FIELD_LAST_MODIFIED_DATE = "lastModifiedDate";
	public static final String FIELD_CREATED_USER 		= "createdUser";
	public static final String FIELD_CREATED_DATE 		= "createdDate";

	public static final int SPACE_TYPE_NONE = -1;
	public static final int SPACE_TYPE_ALL = 0;
	public static final int SPACE_TYPE_VALUE = 1;
	public static final int SPACE_TYPE_PRODUCT_SERVICE = 2;
	public static final int SPACE_TYPE_PRODUCT = 3;	
	public static final int SPACE_TYPE_SERVICE = 4;
	public static final int SPACE_TYPE_TOUCH_POINT = 5;
	public static final int SPACE_TYPE_CUSTOMER = 6;
	public static final int SPACE_TYPE_BIZ_MODEL = 7;
	public static final int SPACE_TYPE_ACTOR = 8;
	public static final int SPACE_TYPE_SOCIETY = 9;
	public static final int SPACE_TYPE_CONTEXT = 10;
	public static final int SPACE_TYPE_TIME = 11;
	public static final int SPACE_TYPE_ENVIRONMENT = 12;
	public static final int SPACE_TYPE_BUSINESS = 13;
	public static final int SPACE_TYPE_ACTOR_CVCA = 21;
	public static final int SPACE_TYPE_COMPLEX = 99;

	public static final int SPACE_TYPE_VALUE_SERVICE = 914;
	public static final int SPACE_TYPE_VALUE_BIZ_MODEL = 917;
	public static final int SPACE_TYPE_SERVICE_BIZ_MODEL = 947;
	public static final int SPACE_TYPE_VALUE_SERVICE_BIZ_MODEL = 9147;
	
	private int spaceType=SPACE_TYPE_ALL;
	private String id;
	private String name;
	private String picture;
	private String desc;
	private ValueSpace valueSpace;
	private ServiceSpace serviceSpace;
	private BizModelSpace bizModelSpace;
	private DefaultSpace productServiceSpace;
	private ProductSpace productSpace;
	private TouchPointSpace touchPointSpace;
	private CustomerSpace customerSpace;
	private ActorSpace actorSpace;
	private DefaultSpace societySpace;
	private ContextSpace contextSpace;
	private TimeSpace timeSpace;
	private DefaultSpace environmentSpace;
	private User lastModifiedUser;
	private LocalDate lastModifiedDate;
	private User createdUser;
	private LocalDate createdDate;
	
	
	public int getSpaceType() {
		return spaceType;
	}
	public void setSpaceType(int spaceType) {
		this.spaceType = spaceType;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public ValueSpace getValueSpace() {
		return valueSpace;
	}
	public void setValueSpace(ValueSpace valueSpace) {
		this.valueSpace = valueSpace;
	}
	public ServiceSpace getServiceSpace() {
		return serviceSpace;
	}
	public void setServiceSpace(ServiceSpace serviceSpace) {
		this.serviceSpace = serviceSpace;
	}
	public BizModelSpace getBizModelSpace() {
		return bizModelSpace;
	}
	public void setBizModelSpace(BizModelSpace bizModelSpace) {
		this.bizModelSpace = bizModelSpace;
	}
	public DefaultSpace getProductServiceSpace() {
		return productServiceSpace;
	}
	public void setProductServiceSpace(DefaultSpace productServiceSpace) {
		this.productServiceSpace = productServiceSpace;
	}
	public ProductSpace getProductSpace() {
		return productSpace;
	}
	public void setProductSpace(ProductSpace productSpace) {
		this.productSpace = productSpace;
	}
	public TouchPointSpace getTouchPointSpace() {
		return touchPointSpace;
	}
	public void setTouchPointSpace(TouchPointSpace touchPointSpace) {
		this.touchPointSpace = touchPointSpace;
	}
	public CustomerSpace getCustomerSpace() {
		return customerSpace;
	}
	public void setCustomerSpace(CustomerSpace customerSpace) {
		this.customerSpace = customerSpace;
	}
	public ActorSpace getActorSpace() {
		return actorSpace;
	}
	public void setActorSpace(ActorSpace actorSpace) {
		this.actorSpace = actorSpace;
	}
	public DefaultSpace getSocietySpace() {
		return societySpace;
	}
	public void setSocietySpace(DefaultSpace societySpace) {
		this.societySpace = societySpace;
	}
	public ContextSpace getContextSpace() {
		return contextSpace;
	}
	public void setContextSpace(ContextSpace contextSpace) {
		this.contextSpace = contextSpace;
	}
	public TimeSpace getTimeSpace() {
		return timeSpace;
	}
	public void setTimeSpace(TimeSpace timeSpace) {
		this.timeSpace = timeSpace;
	}
	public DefaultSpace getEnvironmentSpace() {
		return environmentSpace;
	}
	public void setEnvironmentSpace(DefaultSpace environmentSpace) {
		this.environmentSpace = environmentSpace;
	}
	public User getLastModifiedUser() {
		return lastModifiedUser;
	}
	public void setLastModifiedUser(User lastModifiedUser) {
		this.lastModifiedUser = lastModifiedUser;
	}
	public LocalDate getLastModifiedDate() {
		return lastModifiedDate;
	}
	public void setLastModifiedDate(LocalDate lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}
	public User getCreatedUser() {
		return createdUser;
	}
	public void setCreatedUser(User createdUser) {
		this.createdUser = createdUser;
	}
	public LocalDate getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(LocalDate createdDate) {
		this.createdDate = createdDate;
	}

	public static int getSpaceType(String spaceName){
		if(spaceName==null) return SPACE_TYPE_NONE;

		if(spaceName.equals(PSS_SPACE_VALUE)) return SPACE_TYPE_VALUE;
		if(spaceName.equals(PSS_SPACE_SERVICE)) return SPACE_TYPE_SERVICE;
		if(spaceName.equals(PSS_SPACE_BIZ_MODEL)) return SPACE_TYPE_BIZ_MODEL;
		if(spaceName.equals(PSS_SPACE_PRODUCT_SERVICE)) return SPACE_TYPE_PRODUCT_SERVICE;
		if(spaceName.equals(PSS_SPACE_PRODUCT)) return SPACE_TYPE_PRODUCT;
		if(spaceName.equals(PSS_SPACE_TOUCH_POINT)) return SPACE_TYPE_TOUCH_POINT;
		if(spaceName.equals(PSS_SPACE_CUSTOMER)) return SPACE_TYPE_CUSTOMER;
		if(spaceName.equals(PSS_SPACE_ACTOR)) return SPACE_TYPE_ACTOR;
		if(spaceName.equals(PSS_SPACE_ACTOR_CVCA)) return SPACE_TYPE_ACTOR_CVCA;
		if(spaceName.equals(PSS_SPACE_SOCIETY)) return SPACE_TYPE_SOCIETY;
		if(spaceName.equals(PSS_SPACE_CONTEXT)) return SPACE_TYPE_CONTEXT;
		if(spaceName.equals(PSS_SPACE_TIME)) return SPACE_TYPE_TIME;
		if(spaceName.equals(PSS_SPACE_BUSINESS)) return SPACE_TYPE_BUSINESS;
		if(spaceName.equals(PSS_SPACE_ENVIRONMENT)) return SPACE_TYPE_ENVIRONMENT;
		if(spaceName.equals(PSS_SPACE_COMPLEX)) return SPACE_TYPE_COMPLEX;

		return SPACE_TYPE_NONE;
	}
	
	public static String getSpaceName(int spaceType){

		switch(spaceType){
		case SPACE_TYPE_VALUE:
			return PSS_SPACE_VALUE;
		case SPACE_TYPE_SERVICE:
			return PSS_SPACE_SERVICE;
		case SPACE_TYPE_BIZ_MODEL:
			return PSS_SPACE_BIZ_MODEL;
		case SPACE_TYPE_PRODUCT_SERVICE:
			return PSS_SPACE_PRODUCT_SERVICE;
		case SPACE_TYPE_PRODUCT:
			return PSS_SPACE_PRODUCT;
		case SPACE_TYPE_TOUCH_POINT:
			return PSS_SPACE_TOUCH_POINT;
		case SPACE_TYPE_CUSTOMER:
			return PSS_SPACE_CUSTOMER;
		case SPACE_TYPE_ACTOR:
			return PSS_SPACE_ACTOR;
		case SPACE_TYPE_ACTOR_CVCA:
			return PSS_SPACE_ACTOR_CVCA;
		case SPACE_TYPE_SOCIETY:
			return PSS_SPACE_SOCIETY;
		case SPACE_TYPE_CONTEXT:
			return PSS_SPACE_CONTEXT;
		case SPACE_TYPE_TIME:
			return PSS_SPACE_TIME;
		case SPACE_TYPE_BUSINESS:
			return PSS_SPACE_BUSINESS;
		case SPACE_TYPE_ENVIRONMENT:
			return PSS_SPACE_ENVIRONMENT;
		case SPACE_TYPE_COMPLEX:
			return PSS_SPACE_COMPLEX;
		}
		return PSS_SPACE_VALUE;
	}
}
